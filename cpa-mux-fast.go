package main

import (
	"bytes"
	"compress/gzip"
	"context"
	"encoding/json"
	"flag"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
	"sort"
	"strings"
	"time"
)

type modelList struct {
	Object string        `json:"object,omitempty"`
	Data   []modelObject `json:"data"`
}

type modelObject struct {
	ID      string `json:"id"`
	Object  string `json:"object"`
	Created int64  `json:"created"`
	OwnedBy string `json:"owned_by"`
}

type aliasPreset struct {
	Base   string
	Effort string
}

type claudeAliasRule struct {
	ID      string `json:"id"`
	Base    string `json:"base"`
	OwnedBy string `json:"owned_by,omitempty"`
}

var effortSuffixes = map[string]string{
	"-fast":     "low",
	"-standard": "medium",
	"-deep":     "high",
}

var claudeAliases = defaultClaudeAliases()

func main() {
	listen := flag.String("listen", ":18317", "listen address")
	helper := flag.String("helper", "127.0.0.1:18318", "CPA-helper backend address")
	cpa := flag.String("cpa", "openclaw-cpa:8317", "CPA upstream address")
	hermesToken := flag.String("hermes-token", "", "path token for Hermes-compatible API")
	apiKeyFile := flag.String("api-key-file", "", "API key file used by tokenized Hermes path")
	claudeAliasFile := flag.String("claude-alias-file", "/app/data/override/claude-model-aliases.json", "Claude desktop model alias config file")
	flag.Parse()

	claudeAliases = loadClaudeAliases(*claudeAliasFile)

	helperURL := mustTargetURL(*helper)
	cpaURL := mustTargetURL(*cpa)

	helperProxy := newProxy(helperURL, "")
	cpaProxy := newProxy(cpaURL, "")
	cpaTokenProxy := newProxy(cpaURL, strings.TrimSpace(readOptionalFile(*apiKeyFile)))
	claudeMessagesBridge := newClaudeMessagesBridge(cpaURL)

	mux := http.NewServeMux()
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if *hermesToken != "" && strings.HasPrefix(r.URL.Path, "/"+*hermesToken+"/v1") {
			stripPrefix(r, "/"+*hermesToken)
			prepareCPARequest(r)
			cpaTokenProxy.ServeHTTP(w, r)
			return
		}
		if r.URL.Path == "/v1" || strings.HasPrefix(r.URL.Path, "/v1/") {
			if r.Method == http.MethodPost && r.URL.Path == "/v1/messages" {
				if meta, ok := prepareClaudeSonnetChatRequest(r); ok {
					claudeMessagesBridge.ServeHTTP(w, r.WithContext(withClaudeBridgeMeta(r, meta)))
					return
				}
			}
			prepareCPARequest(r)
			cpaProxy.ServeHTTP(w, r)
			return
		}
		helperProxy.ServeHTTP(w, r)
	})

	server := &http.Server{
		Addr:              *listen,
		Handler:           mux,
		ReadHeaderTimeout: 30 * time.Second,
	}
	log.Printf("cpa-mux listening on %s, helper=%s, cpa=%s", *listen, helperURL, cpaURL)
	if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Fatal(err)
	}
}

type claudeBridgeMeta struct {
	Model  string
	Stream bool
}

type claudeBridgeContextKey struct{}

func withClaudeBridgeMeta(r *http.Request, meta claudeBridgeMeta) context.Context {
	return context.WithValue(r.Context(), claudeBridgeContextKey{}, meta)
}

func newClaudeMessagesBridge(target *url.URL) *httputil.ReverseProxy {
	proxy := httputil.NewSingleHostReverseProxy(target)
	originalDirector := proxy.Director
	proxy.Director = func(r *http.Request) {
		originalDirector(r)
		r.Host = target.Host
		r.URL.Path = "/v1/chat/completions"
		r.RequestURI = ""
	}
	proxy.ModifyResponse = func(resp *http.Response) error {
		if resp.StatusCode < 200 || resp.StatusCode >= 300 {
			return nil
		}
		meta, _ := resp.Request.Context().Value(claudeBridgeContextKey{}).(claudeBridgeMeta)
		body, err := readResponseBody(resp)
		if err != nil {
			return err
		}
		var next []byte
		if meta.Stream {
			next, err = openAIStreamToClaude(body, meta.Model)
			resp.Header.Set("Content-Type", "text/event-stream")
		} else {
			next, err = openAIResponseToClaude(body, meta.Model)
			resp.Header.Set("Content-Type", "application/json")
		}
		if err != nil {
			return err
		}
		resp.Body = io.NopCloser(bytes.NewReader(next))
		resp.ContentLength = int64(len(next))
		resp.Header.Set("Content-Length", fmt.Sprint(len(next)))
		resp.Header.Del("Content-Encoding")
		return nil
	}
	proxy.ErrorHandler = func(w http.ResponseWriter, r *http.Request, err error) {
		http.Error(w, fmt.Sprintf("Bad gateway: %v", err), http.StatusBadGateway)
	}
	return proxy
}

func mustTargetURL(raw string) *url.URL {
	if !strings.Contains(raw, "://") {
		raw = "http://" + raw
	}
	u, err := url.Parse(raw)
	if err != nil {
		log.Fatalf("invalid upstream %q: %v", raw, err)
	}
	return u
}

func readOptionalFile(path string) string {
	if path == "" {
		return ""
	}
	b, err := os.ReadFile(path)
	if err != nil {
		log.Printf("open api key file %s failed: %v", path, err)
		return ""
	}
	return string(bytes.TrimSpace(b))
}

func newProxy(target *url.URL, bearerToken string) *httputil.ReverseProxy {
	proxy := httputil.NewSingleHostReverseProxy(target)
	originalDirector := proxy.Director
	proxy.Director = func(r *http.Request) {
		originalDirector(r)
		r.Host = target.Host
		if bearerToken != "" {
			r.Header.Set("Authorization", "Bearer "+bearerToken)
		}
	}
	proxy.ModifyResponse = func(resp *http.Response) error {
		disableFrontendCaching(resp)
		if resp.Request != nil && resp.Request.URL != nil && resp.Request.URL.Path == "/v1/models" {
			return addFastModelAliases(resp)
		}
		return nil
	}
	proxy.ErrorHandler = func(w http.ResponseWriter, r *http.Request, err error) {
		http.Error(w, fmt.Sprintf("Bad gateway: %v", err), http.StatusBadGateway)
	}
	return proxy
}

func disableFrontendCaching(resp *http.Response) {
	if resp == nil || resp.Header == nil || resp.Request == nil || resp.Request.URL == nil {
		return
	}
	path := resp.Request.URL.Path
	contentType := strings.ToLower(resp.Header.Get("Content-Type"))
	frontendResponse := strings.HasPrefix(path, "/assets/") ||
		strings.Contains(contentType, "text/html") ||
		strings.Contains(contentType, "javascript") ||
		strings.Contains(contentType, "text/css")
	if !frontendResponse {
		return
	}
	resp.Header.Set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
	resp.Header.Set("Pragma", "no-cache")
	resp.Header.Set("Expires", "0")
}

func stripPrefix(r *http.Request, prefix string) {
	r.URL.Path = strings.TrimPrefix(r.URL.Path, prefix)
	if r.URL.Path == "" {
		r.URL.Path = "/"
	}
	r.RequestURI = ""
}

func prepareCPARequest(r *http.Request) {
	if r.Method == http.MethodPost && (r.URL.Path == "/v1/responses" || r.URL.Path == "/v1/chat/completions" || r.URL.Path == "/v1/messages") {
		applyModelAlias(r)
	}
}

func prepareClaudeSonnetChatRequest(r *http.Request) (claudeBridgeMeta, bool) {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		return claudeBridgeMeta{}, false
	}
	_ = r.Body.Close()
	decoded, ok := decodePossiblyGzip(body)
	if !ok {
		r.Body = io.NopCloser(bytes.NewReader(body))
		return claudeBridgeMeta{}, false
	}
	var payload map[string]any
	if json.Unmarshal(decoded, &payload) != nil {
		r.Body = io.NopCloser(bytes.NewReader(body))
		return claudeBridgeMeta{}, false
	}
	requestedModel, _ := payload["model"].(string)
	baseModel, isSonnet := claudeSonnet46Base(requestedModel)
	if !isSonnet {
		r.Body = io.NopCloser(bytes.NewReader(body))
		return claudeBridgeMeta{}, false
	}

	chat := make(map[string]any)
	chat["model"] = baseModel
	chat["stream"] = payload["stream"] == true
	for _, key := range []string{"max_tokens", "temperature", "top_p", "metadata"} {
		if value, exists := payload[key]; exists {
			chat[key] = value
		}
	}
	if stops, exists := payload["stop_sequences"]; exists {
		chat["stop"] = stops
	}

	messages := make([]any, 0)
	if system, exists := payload["system"]; exists {
		messages = append(messages, map[string]any{"role": "system", "content": claudeContentToChat(system)})
	}
	if originalMessages, ok := payload["messages"].([]any); ok {
		for _, rawMessage := range originalMessages {
			message, ok := rawMessage.(map[string]any)
			if !ok {
				continue
			}
			next := map[string]any{"role": message["role"], "content": claudeContentToChat(message["content"])}
			messages = append(messages, next)
		}
	}
	chat["messages"] = messages

	if tools, ok := payload["tools"].([]any); ok {
		converted := make([]any, 0, len(tools))
		for _, rawTool := range tools {
			tool, ok := rawTool.(map[string]any)
			if !ok {
				continue
			}
			function := map[string]any{"name": tool["name"]}
			if description, exists := tool["description"]; exists {
				function["description"] = description
			}
			if schema, exists := tool["input_schema"]; exists {
				function["parameters"] = schema
			}
			converted = append(converted, map[string]any{"type": "function", "function": function})
		}
		if len(converted) > 0 {
			chat["tools"] = converted
		}
	}

	next, err := json.Marshal(chat)
	if err != nil {
		r.Body = io.NopCloser(bytes.NewReader(body))
		return claudeBridgeMeta{}, false
	}
	r.Body = io.NopCloser(bytes.NewReader(next))
	r.ContentLength = int64(len(next))
	r.Header.Set("Content-Length", fmt.Sprint(len(next)))
	r.Header.Set("Content-Type", "application/json")
	r.Header.Del("Content-Encoding")
	stream, _ := chat["stream"].(bool)
	return claudeBridgeMeta{Model: baseModel, Stream: stream}, true
}

func decodePossiblyGzip(body []byte) ([]byte, bool) {
	if len(body) < 2 || body[0] != 0x1f || body[1] != 0x8b {
		return body, true
	}
	gz, err := gzip.NewReader(bytes.NewReader(body))
	if err != nil {
		return nil, false
	}
	defer gz.Close()
	decoded, err := io.ReadAll(gz)
	return decoded, err == nil
}

func claudeContentToChat(content any) any {
	blocks, ok := content.([]any)
	if !ok {
		return content
	}
	converted := make([]any, 0, len(blocks))
	for _, rawBlock := range blocks {
		block, ok := rawBlock.(map[string]any)
		if !ok {
			continue
		}
		switch block["type"] {
		case "text":
			converted = append(converted, map[string]any{"type": "text", "text": block["text"]})
		case "image":
			if source, ok := block["source"].(map[string]any); ok && source["type"] == "base64" {
				mediaType, _ := source["media_type"].(string)
				data, _ := source["data"].(string)
				converted = append(converted, map[string]any{"type": "image_url", "image_url": map[string]any{"url": "data:" + mediaType + ";base64," + data}})
			}
		}
	}
	return converted
}

func openAIResponseToClaude(body []byte, model string) ([]byte, error) {
	var source map[string]any
	if err := json.Unmarshal(body, &source); err != nil {
		return nil, err
	}
	content := make([]any, 0, 1)
	stopReason := "end_turn"
	if choices, ok := source["choices"].([]any); ok && len(choices) > 0 {
		if choice, ok := choices[0].(map[string]any); ok {
			if message, ok := choice["message"].(map[string]any); ok {
				if text, ok := message["content"].(string); ok && text != "" {
					content = append(content, map[string]any{"type": "text", "text": text})
				}
			}
			if finish, _ := choice["finish_reason"].(string); finish == "length" {
				stopReason = "max_tokens"
			}
		}
	}
	inputTokens, outputTokens := 0, 0
	if usage, ok := source["usage"].(map[string]any); ok {
		inputTokens = intFromJSON(usage["prompt_tokens"])
		outputTokens = intFromJSON(usage["completion_tokens"])
	}
	result := map[string]any{
		"id": source["id"], "type": "message", "role": "assistant", "model": model,
		"content": content, "stop_reason": stopReason, "stop_sequence": nil,
		"usage": map[string]any{"input_tokens": inputTokens, "output_tokens": outputTokens},
	}
	return json.Marshal(result)
}

func openAIStreamToClaude(body []byte, model string) ([]byte, error) {
	var textContent strings.Builder
	messageID := fmt.Sprintf("msg_%x", time.Now().UnixNano())
	stopReason := "end_turn"
	inputTokens, outputTokens := 0, 0
	for _, line := range strings.Split(string(body), "\n") {
		line = strings.TrimSpace(line)
		if !strings.HasPrefix(line, "data:") {
			continue
		}
		data := strings.TrimSpace(strings.TrimPrefix(line, "data:"))
		if data == "" || data == "[DONE]" {
			continue
		}
		var chunk map[string]any
		if json.Unmarshal([]byte(data), &chunk) != nil {
			continue
		}
		if id, ok := chunk["id"].(string); ok && id != "" {
			messageID = id
		}
		if choices, ok := chunk["choices"].([]any); ok && len(choices) > 0 {
			if choice, ok := choices[0].(map[string]any); ok {
				if delta, ok := choice["delta"].(map[string]any); ok {
					if text, ok := delta["content"].(string); ok {
						textContent.WriteString(text)
					}
				}
				if finish, _ := choice["finish_reason"].(string); finish == "length" {
					stopReason = "max_tokens"
				}
			}
		}
		if usage, ok := chunk["usage"].(map[string]any); ok {
			inputTokens = intFromJSON(usage["prompt_tokens"])
			outputTokens = intFromJSON(usage["completion_tokens"])
		}
	}

	events := make([]string, 0, 6)
	events = append(events, claudeSSE("message_start", map[string]any{"type": "message_start", "message": map[string]any{
		"id": messageID, "type": "message", "role": "assistant", "model": model, "content": []any{},
		"stop_reason": nil, "stop_sequence": nil, "usage": map[string]any{"input_tokens": inputTokens, "output_tokens": 0},
	}}))
	events = append(events, claudeSSE("content_block_start", map[string]any{"type": "content_block_start", "index": 0, "content_block": map[string]any{"type": "text", "text": ""}}))
	if textContent.Len() > 0 {
		events = append(events, claudeSSE("content_block_delta", map[string]any{"type": "content_block_delta", "index": 0, "delta": map[string]any{"type": "text_delta", "text": textContent.String()}}))
	}
	events = append(events, claudeSSE("content_block_stop", map[string]any{"type": "content_block_stop", "index": 0}))
	events = append(events, claudeSSE("message_delta", map[string]any{"type": "message_delta", "delta": map[string]any{"stop_reason": stopReason, "stop_sequence": nil}, "usage": map[string]any{"output_tokens": outputTokens}}))
	events = append(events, claudeSSE("message_stop", map[string]any{"type": "message_stop"}))
	return []byte(strings.Join(events, "")), nil
}

func claudeSSE(event string, payload any) string {
	body, _ := json.Marshal(payload)
	return "event: " + event + "\ndata: " + string(body) + "\n\n"
}

func intFromJSON(value any) int {
	if number, ok := value.(float64); ok {
		return int(number)
	}
	return 0
}

func applyModelAlias(r *http.Request) {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		return
	}
	_ = r.Body.Close()
	if len(body) == 0 {
		r.Body = io.NopCloser(bytes.NewReader(body))
		return
	}

	decodedBody := body
	// Some ingress layers decompress request bodies but leave the original
	// Content-Encoding header in place; others preserve the compressed bytes.
	// Detect gzip from its magic bytes so both forms normalize correctly.
	if len(body) >= 2 && body[0] == 0x1f && body[1] == 0x8b {
		gz, err := gzip.NewReader(bytes.NewReader(body))
		if err != nil {
			r.Body = io.NopCloser(bytes.NewReader(body))
			return
		}
		decodedBody, err = io.ReadAll(gz)
		_ = gz.Close()
		if err != nil {
			r.Body = io.NopCloser(bytes.NewReader(body))
			return
		}
	}

	var payload map[string]any
	if err := json.Unmarshal(decodedBody, &payload); err != nil {
		r.Body = io.NopCloser(bytes.NewReader(body))
		return
	}
	model, _ := payload["model"].(string)
	sonnetNormalized := false
	if r.URL.Path == "/v1/messages" {
		// Claude Desktop sends adaptive Thinking and output_config.effort for
		// Sonnet 4.6 even when the same Antigravity credential still has plain
		// Sonnet capacity. Antigravity can return RESOURCE_EXHAUSTED for those
		// effort variants while ordinary Sonnet requests continue to succeed.
		// Normalize only the Sonnet Messages compatibility route to plain
		// generation; Workbuddy's Chat Completions route and Opus Thinking stay
		// untouched.
		if baseModel, ok := claudeSonnet46Base(model); ok {
			// CPA supports effort suffixes such as model(low). Claude Desktop
			// uses that form for its Low/High selector, so remove the suffix as
			// well as the equivalent request fields.
			model = baseModel
			payload["model"] = baseModel
			stripClaudeThinkingEffort(payload)
			sonnetNormalized = true
		}
		// Claude clients may keep the base Opus model ID and express Thinking as
		// a request option instead of selecting a separate model ID. Route those
		// requests to the genuine CPA thinking model. Plain Opus also passes
		// through natively; GPT uses a separate, explicitly named compatibility ID.
		if strings.TrimSpace(model) == "claude-opus-4-6" && requestsClaudeThinking(payload) {
			model = "claude-opus-4-6-thinking"
		}
		if mapped, ok := claudeDesktopModelAlias(model); ok {
			payload["model"] = mapped
			writeJSONRequestBody(r, payload, body)
			return
		}
		if sonnetNormalized {
			writeJSONRequestBody(r, payload, body)
			return
		}
	}
	preset, ok := parseAlias(model)
	if !ok {
		r.Body = io.NopCloser(bytes.NewReader(body))
		return
	}

	payload["model"] = preset.Base
	if r.URL.Path == "/v1/responses" {
		reasoning, _ := payload["reasoning"].(map[string]any)
		if reasoning == nil {
			reasoning = map[string]any{}
		}
		reasoning["effort"] = preset.Effort
		payload["reasoning"] = reasoning
	} else if r.URL.Path == "/v1/chat/completions" {
		payload["reasoning_effort"] = preset.Effort
	}

	writeJSONRequestBody(r, payload, body)
}

func isClaudeSonnet46(model string) bool {
	_, ok := claudeSonnet46Base(model)
	return ok
}

func claudeSonnet46Base(model string) (string, bool) {
	model = strings.TrimSpace(model)
	if open := strings.LastIndex(model, "("); open >= 0 && strings.HasSuffix(model, ")") {
		model = strings.TrimSpace(model[:open])
	}
	return model, model == "claude-sonnet-4-6" || model == "claude-antigravity-sonnet-4-6"
}

func stripClaudeThinkingEffort(payload map[string]any) {
	delete(payload, "thinking")
	delete(payload, "reasoning_effort")
	delete(payload, "effort")

	outputConfig, ok := payload["output_config"].(map[string]any)
	if !ok {
		return
	}
	delete(outputConfig, "effort")
	if len(outputConfig) == 0 {
		delete(payload, "output_config")
	}
}

func requestsClaudeThinking(payload map[string]any) bool {
	thinking, exists := payload["thinking"]
	if !exists || thinking == nil {
		return false
	}
	switch value := thinking.(type) {
	case bool:
		return value
	case map[string]any:
		kind, _ := value["type"].(string)
		kind = strings.ToLower(strings.TrimSpace(kind))
		return kind != "" && kind != "disabled" && kind != "off" && kind != "none"
	default:
		return false
	}
}

func writeJSONRequestBody(r *http.Request, payload map[string]any, originalBody []byte) {
	next, err := json.Marshal(payload)
	if err != nil {
		r.Body = io.NopCloser(bytes.NewReader(originalBody))
		return
	}
	r.Body = io.NopCloser(bytes.NewReader(next))
	r.ContentLength = int64(len(next))
	r.Header.Set("Content-Length", fmt.Sprint(len(next)))
	r.Header.Set("Content-Type", "application/json")
	r.Header.Del("Content-Encoding")
}

func claudeDesktopModelAlias(model string) (string, bool) {
	model = strings.TrimSpace(model)
	for _, alias := range claudeAliases {
		if model == alias.ID {
			return alias.Base, true
		}
	}
	return "", false
}

func defaultClaudeAliases() []claudeAliasRule {
	return []claudeAliasRule{
		{ID: "claude-sonnet-4-6", Base: "claude-antigravity-sonnet-4-6", OwnedBy: "anthropic"},
		{ID: "claude-opus-4-6", Base: "claude-antigravity-opus-4-6", OwnedBy: "anthropic"},
		{ID: "claude-opus-4-6-thinking", Base: "claude-antigravity-opus-4-6-thinking", OwnedBy: "anthropic"},
		{ID: "claude-opus-4-8", Base: "gpt-5.6-sol", OwnedBy: "anthropic"},
	}
}

func masksCanonicalClaudeModel(alias claudeAliasRule) bool {
	// Only the explicitly labeled GPT compatibility route may target a
	// non-Claude model. Genuine Opus and Thinking IDs are always protected,
	// including from stale mappings in the persistent volume.
	if alias.ID == "claude-opus-4-8" && alias.Base == "gpt-5.6-sol" {
		return false
	}
	return strings.HasPrefix(alias.ID, "claude-") && !strings.HasPrefix(alias.Base, "claude-")
}

func loadClaudeAliases(path string) []claudeAliasRule {
	defaults := defaultClaudeAliases()
	if path == "" {
		return defaults
	}
	body, err := os.ReadFile(path)
	if err != nil {
		log.Printf("read Claude alias file %s failed: %v; using defaults", path, err)
		return defaults
	}
	body = bytes.TrimSpace(body)
	if len(body) == 0 {
		return defaults
	}

	var list []claudeAliasRule
	if err := json.Unmarshal(body, &list); err == nil {
		return normalizeClaudeAliases(list, defaults)
	}

	var mapping map[string]string
	if err := json.Unmarshal(body, &mapping); err != nil {
		log.Printf("parse Claude alias file %s failed: %v; using defaults", path, err)
		return defaults
	}
	keys := make([]string, 0, len(mapping))
	for id := range mapping {
		keys = append(keys, id)
	}
	sort.Strings(keys)
	list = make([]claudeAliasRule, 0, len(keys))
	for _, id := range keys {
		list = append(list, claudeAliasRule{ID: id, Base: mapping[id], OwnedBy: "anthropic"})
	}
	return normalizeClaudeAliases(list, defaults)
}

func normalizeClaudeAliases(list []claudeAliasRule, fallback []claudeAliasRule) []claudeAliasRule {
	// Built-in aliases are compatibility routes that should survive an older
	// persisted alias file. User entries overlay the defaults by ID so custom
	// targets still win without dropping newly shipped routes.
	merged := make([]claudeAliasRule, 0, len(fallback)+len(list))
	positions := make(map[string]int, len(fallback)+len(list))
	appendOrReplace := func(alias claudeAliasRule) {
		alias.ID = strings.TrimSpace(alias.ID)
		alias.Base = strings.TrimSpace(alias.Base)
		alias.OwnedBy = strings.TrimSpace(alias.OwnedBy)
		if alias.ID == "" || alias.Base == "" {
			return
		}
		if masksCanonicalClaudeModel(alias) {
			log.Printf("ignore Claude alias %q -> %q: canonical Claude IDs cannot mask non-Claude models", alias.ID, alias.Base)
			return
		}
		if alias.OwnedBy == "" {
			alias.OwnedBy = "anthropic"
		}
		if index, ok := positions[alias.ID]; ok {
			merged[index] = alias
			return
		}
		positions[alias.ID] = len(merged)
		merged = append(merged, alias)
	}
	for _, alias := range fallback {
		appendOrReplace(alias)
	}
	for _, alias := range list {
		appendOrReplace(alias)
	}
	return merged
}

func parseAlias(model string) (aliasPreset, bool) {
	for suffix, effort := range effortSuffixes {
		if strings.HasSuffix(model, suffix) {
			base := strings.TrimSuffix(model, suffix)
			if base != "" {
				return aliasPreset{Base: base, Effort: effort}, true
			}
		}
	}
	return aliasPreset{}, false
}

func addFastModelAliases(resp *http.Response) error {
	body, err := readResponseBody(resp)
	if err != nil {
		return err
	}
	var list modelList
	if err := json.Unmarshal(body, &list); err != nil {
		resp.Body = io.NopCloser(bytes.NewReader(body))
		resp.ContentLength = int64(len(body))
		resp.Header.Set("Content-Length", fmt.Sprint(len(body)))
		return nil
	}

	seen := make(map[string]bool, len(list.Data)*4)
	byID := make(map[string]modelObject, len(list.Data))
	for _, m := range list.Data {
		seen[m.ID] = true
		byID[m.ID] = m
	}

	preferredBases := []string{
		"gpt-5.6-sol",
		"gpt-5.6-terra",
		"gpt-5.6-luna",
		"gpt-5.5",
		"gpt-5.4",
		"gpt-5.4-mini",
		"gpt-5.3-codex-spark",
		"gpt-5.2",
		"codex-auto-review",
	}
	for _, base := range preferredBases {
		m, ok := byID[base]
		if !ok {
			continue
		}
		for _, suffix := range []string{"-fast", "-standard", "-deep"} {
			id := base + suffix
			if seen[id] {
				continue
			}
			alias := m
			alias.ID = id
			if alias.Object == "" {
				alias.Object = "model"
			}
			list.Data = append(list.Data, alias)
			seen[id] = true
		}
	}

	for _, item := range claudeAliases {
		if seen[item.ID] {
			continue
		}
		base, ok := byID[item.Base]
		if !ok {
			base = modelObject{
				Object:  "model",
				Created: time.Now().Unix(),
				OwnedBy: item.OwnedBy,
			}
		}
		base.ID = item.ID
		if base.Object == "" {
			base.Object = "model"
		}
		base.OwnedBy = item.OwnedBy
		list.Data = append(list.Data, base)
		seen[item.ID] = true
	}

	sort.SliceStable(list.Data, func(i, j int) bool {
		return modelRank(list.Data[i].ID) < modelRank(list.Data[j].ID)
	})

	next, err := json.Marshal(list)
	if err != nil {
		return err
	}
	resp.Body = io.NopCloser(bytes.NewReader(next))
	resp.ContentLength = int64(len(next))
	resp.Header.Set("Content-Length", fmt.Sprint(len(next)))
	resp.Header.Del("Content-Encoding")
	return nil
}

func readResponseBody(resp *http.Response) ([]byte, error) {
	var reader io.ReadCloser = resp.Body
	if strings.EqualFold(resp.Header.Get("Content-Encoding"), "gzip") {
		gz, err := gzip.NewReader(resp.Body)
		if err != nil {
			return nil, err
		}
		reader = gz
	}
	defer reader.Close()
	return io.ReadAll(reader)
}

func modelRank(id string) int {
	order := []string{
		"gpt-5.6-sol-fast", "gpt-5.6-sol", "gpt-5.6-sol-standard", "gpt-5.6-sol-deep",
		"gpt-5.6-terra-fast", "gpt-5.6-terra", "gpt-5.6-terra-standard", "gpt-5.6-terra-deep",
		"gpt-5.6-luna-fast", "gpt-5.6-luna", "gpt-5.6-luna-standard", "gpt-5.6-luna-deep",
		"gpt-5.5-fast", "gpt-5.5", "gpt-5.5-standard", "gpt-5.5-deep",
		"gpt-5.4-fast", "gpt-5.4", "gpt-5.4-standard", "gpt-5.4-deep",
		"gpt-5.4-mini-fast", "gpt-5.4-mini", "gpt-5.4-mini-standard", "gpt-5.4-mini-deep",
		"gpt-5.3-codex-spark-fast", "gpt-5.3-codex-spark", "gpt-5.3-codex-spark-standard", "gpt-5.3-codex-spark-deep",
		"gpt-5.2-fast", "gpt-5.2", "gpt-5.2-standard", "gpt-5.2-deep",
		"codex-auto-review-fast", "codex-auto-review", "codex-auto-review-standard", "codex-auto-review-deep",
		"claude-opus-4-8",
	}
	for i, model := range order {
		if id == model {
			return i
		}
	}
	return len(order) + 1
}
