#!/bin/sh
set -eu

runtime_dir=/opt/cpa-helper-runtime
data_dir=${CPA_DATA_DIR:-/app/data}
override_dir="$data_dir/override"

mkdir -p "$override_dir" "$data_dir/db"

# Seed immutable runtime assets into the persistent volume. Existing migrated
# files win so server-side hotfixes and user data remain intact.
for file in cpa-helper-linux-amd64 claude-model-aliases.json; do
  if [ ! -e "$override_dir/$file" ]; then
    cp "$runtime_dir/$file" "$override_dir/$file"
  fi
done
# The mux contains protocol and model-routing compatibility logic. Refresh it
# on each image rollout while leaving the helper binary and user alias file
# overrideable from the persistent volume.
cp "$runtime_dir/cpa-mux" "$override_dir/cpa-mux"
if [ ! -d "$override_dir/dist" ]; then
  cp -R "$runtime_dir/dist" "$override_dir/dist"
fi
# Versioned frontend releases must replace the persistent HTML entrypoint.
# Copy immutable assets first so active sessions keep their previous imports.
if [ -f "$runtime_dir/frontend-release.txt" ] && \
   ! cmp -s "$runtime_dir/frontend-release.txt" "$override_dir/frontend-release.txt"; then
  mkdir -p "$override_dir/dist/assets" "$override_dir/frontend-backups"
  if [ -f "$override_dir/dist/index.html" ]; then
    cp "$override_dir/dist/index.html" "$override_dir/frontend-backups/index-$(date +%Y%m%d%H%M%S).html"
  fi
  cp -R "$runtime_dir/dist/assets/." "$override_dir/dist/assets/"
  cp "$runtime_dir/dist/index.html" "$override_dir/dist/index.html.next"
  mv "$override_dir/dist/index.html.next" "$override_dir/dist/index.html"
  cp "$runtime_dir/frontend-release.txt" "$override_dir/frontend-release.txt"
fi
# This compatibility route is deployment-only; never bake its token into Git assets.
if [ ! -f "$override_dir/dist/runtime-settings.js" ]; then
  hermes_path="/v1"
  if [ -n "${HERMES_TOKEN:-}" ]; then hermes_path="/${HERMES_TOKEN}/v1"; fi
  jq -nr --arg path "$hermes_path" '''"window.CPA_HELPER_HERMES_PATH=" + ($path | tojson) + ";"''' > "$override_dir/dist/runtime-settings.js"
fi
chmod +x "$override_dir/cpa-helper-linux-amd64" "$override_dir/cpa-mux"

# The helper resolves its bundled frontend relative to the working directory.
cd "$override_dir"

export CPA_HELPER_ADDR=${CPA_HELPER_ADDR:-:18318}
export CPA_HELPER_FRONTEND_DIST=${CPA_HELPER_FRONTEND_DIST:-$override_dir/dist}

api_key_file=${HERMES_API_KEY_FILE:-$override_dir/hermes-api-key}
if [ ! -s "$api_key_file" ]; then
  if [ -n "${HERMES_API_KEY:-}" ]; then
    printf '%s\n' "$HERMES_API_KEY" > "$api_key_file"
    chmod 600 "$api_key_file"
  else
    # Hermes is an optional tokenized compatibility route. Standard /v1
    # requests carry their own API key and must not depend on Hermes secrets.
    : > "$api_key_file"
    chmod 600 "$api_key_file"
    echo "Hermes compatibility route disabled; standard /v1 routes remain enabled"
  fi
fi

"$override_dir/cpa-helper-linux-amd64" &
helper_pid=$!

reconcile_native_claude_aliases() {
  helper_data_dir=${CPA_HELPER_DATA_DIR:-$data_dir}
  db_file="$helper_data_dir/db/cpa_helper.sqlite3"
  alternate_db_file="$override_dir/db/cpa_helper.sqlite3"
  alias_spec="$runtime_dir/cpa-native-claude-aliases.json"
  default_cpa_base=${CPA_ADDR:-https://cpa-helper.69fc6cf841759f9bfacd8a60.servers.onzeabur.com}

  attempt=1
  while [ "$attempt" -le 15 ]; do
    cpa_base="$default_cpa_base"
    management_key=""
    discovered_db_files=$(find "$data_dir" -type f -name 'cpa_helper.sqlite3' 2>/dev/null || true)
    for candidate_db_file in "$db_file" "$alternate_db_file" $discovered_db_files; do
      if [ ! -s "$candidate_db_file" ]; then
        continue
      fi
      settings_row=$(sqlite3 -readonly "$candidate_db_file" \
        "PRAGMA busy_timeout=3000; SELECT COALESCE(cliaproxy_url, ''), COALESCE(management_key, '') FROM app_settings WHERE id = 1;" \
        2>/dev/null | tail -n 1 || true)
      case "$settings_row" in
        *'|'*)
          saved_cpa_base=${settings_row%%|*}
          saved_management_key=${settings_row#*|}
          if [ -n "$saved_management_key" ]; then
            db_file="$candidate_db_file"
            management_key="$saved_management_key"
            if [ -n "$saved_cpa_base" ]; then
              cpa_base="$saved_cpa_base"
            fi
            break
          fi
          ;;
      esac
    done
    case "$cpa_base" in
      http://*|https://*) ;;
      *) cpa_base="http://$cpa_base" ;;
    esac
    if [ -n "$management_key" ]; then
      current_aliases=$(curl -fsS --connect-timeout 2 --max-time 5 \
        -H "X-Management-Key: $management_key" \
        "$cpa_base/v0/management/oauth-model-alias" 2>/dev/null || true)
      if [ -n "$current_aliases" ]; then
        patch_body=$(jq -cn \
          --argjson current "$current_aliases" \
          --slurpfile spec "$alias_spec" '
            ($spec[0].aliases) as $wanted
            | ($wanted | map(.alias)) as $wanted_aliases
            | (($current["oauth-model-alias"].antigravity // [])
                | map(select(.alias as $alias | ($wanted_aliases | index($alias) | not)))) as $kept
            | {channel: "antigravity", aliases: ($kept + $wanted)}
          ' 2>/dev/null || true)
        if [ -n "$patch_body" ]; then
          status_code=$(curl -sS -o /dev/null -w '%{http_code}' \
            --connect-timeout 2 --max-time 5 \
            -X PATCH \
            -H "X-Management-Key: $management_key" \
            -H 'Content-Type: application/json' \
            --data "$patch_body" \
            "$cpa_base/v0/management/oauth-model-alias" 2>/dev/null || true)
          case "$status_code" in
            2??)
              echo "CPA Antigravity Claude aliases reconciled"
              return 0
              ;;
          esac
        fi
      fi
      if [ "$attempt" -eq 1 ] || [ "$attempt" -eq 15 ]; then
        echo "CPA alias reconciliation attempt $attempt did not complete" >&2
      fi
    fi
    attempt=$((attempt + 1))
    sleep 2
  done

  echo "warning: CPA Antigravity Claude aliases were not reconciled; native Claude routes may be unavailable" >&2
  return 0
}

"$override_dir/cpa-mux" \
  -listen "${CPA_LISTEN:-:18317}" \
  -helper "${CPA_HELPER_UPSTREAM:-127.0.0.1:18318}" \
  -cpa "${CPA_ADDR:-https://cpa-helper.69fc6cf841759f9bfacd8a60.servers.onzeabur.com}" \
  -hermes-token "${HERMES_TOKEN:-}" \
  -api-key-file "$api_key_file" &
mux_pid=$!

# Alias repair is best-effort and must never delay the public API listener.
reconcile_native_claude_aliases &
reconcile_pid=$!

trap 'kill $helper_pid $mux_pid $reconcile_pid 2>/dev/null || true; wait 2>/dev/null || true' TERM INT

while kill -0 "$helper_pid" 2>/dev/null && kill -0 "$mux_pid" 2>/dev/null; do
  sleep 2
done

kill "$helper_pid" "$mux_pid" 2>/dev/null || true
wait 2>/dev/null || true
