FROM alpine:3.22

RUN apk add --no-cache ca-certificates curl jq sqlite tzdata

WORKDIR /opt/cpa-helper-runtime

COPY cpa-helper-linux-amd64 cpa-mux start-with-mux.sh claude-model-aliases.json cpa-native-claude-aliases.json ./
COPY dist ./dist
COPY frontend-release.txt ./frontend-release.txt

RUN chmod +x cpa-helper-linux-amd64 cpa-mux start-with-mux.sh

ENV TZ=Asia/Shanghai \
    CPA_HELPER_ADDR=:18318 \
    CPA_ADDR=https://cpa-helper.69fc6cf841759f9bfacd8a60.servers.onzeabur.com \
    CPA_LISTEN=:18317 \
    CPA_DATA_DIR=/app/data

VOLUME ["/app/data"]
EXPOSE 18317

ENTRYPOINT ["/opt/cpa-helper-runtime/start-with-mux.sh"]
