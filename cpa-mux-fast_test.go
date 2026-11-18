package main

import (
	"bytes"
	"compress/gzip"
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"net/url"
	"os"
	"path/filepath"
	"strings"
	"testing"
)

func TestClaudeDesktopModelAlias(t *testing.T) {
	tests := map[string]string{
		"claude-sonnet-4-6":        "claude-antigravity-sonnet-4-6",
		"claude-opus-4-6":          "claude-antigravity-opus-4-6",
		"claude-opus-4-6-thinking": "claude-antigravity-opus-4-6-thinking",
		"claude-opus-4-8":          "gpt-5.6-sol",
	}

	for input, want := range tests {
		got, ok := claudeDesktopModelAlias(input)
		if !ok {
			t.Fatalf("expected alias for %s", input)
		}
		if got != want {
			t.Fatalf("alias for %s = %s, want %s", input, got, want)
		}
	}
}

func TestPrepareClaudeSonnetChatRequest(t *testing.T) {
	request := httptest.NewRequest(http.MethodPost, "http://example.test/v1/messages", strings.NewReader(`{
		"model":"claude-sonnet-4-6(low)",
		"system":"Be concise",
		"messages":[{"role":"user","content":"hello"}],
		"thinking":{"type":"adaptive"},
		"output_config":{"effort":"low"},
		"max_tokens":64,
		"stream":true
	}`))
	meta, ok := prepareClaudeSonnetChatRequest(request)
	if !ok || meta.Model != "claude-sonnet-4-6" || !meta.Stream {
		t.Fatalf("unexpected bridge meta: %#v, ok=%v", meta, ok)
	}
	var payload map[string]any
	if err := json.NewDecoder(request.Body).Decode(&payload); err != nil {
		t.Fatal(err)
	}
	if payload["model"] != "claude-sonnet-4-6" {
		t.Fatalf("model = %v", payload["model"])
	}
	if _, exists := payload["thinking"]; exists {
		t.Fatal("thinking leaked into Chat Completions payload")
	}
	messages := payload["messages"].([]any)
	if got := messages[0].(map[string]any)["role"]; got != "system" {
		t.Fatalf("first role = %v", got)
	}
}

func TestOpenAIResponseToClaude(t *testing.T) {
	got, err := openAIResponseToClaude([]byte(`{
		"id":"chatcmpl_1",
		"choices":[{"message":{"content":"BRIDGE_OK"},"finish_reason":"stop"}],
		"usage":{"prompt_tokens":11,"completion_tokens":3}
	}`), "claude-sonnet-4-6")
	if err != nil {
		t.Fatal(err)
	}
	var message map[string]any
	if err := json.Unmarshal(got, &message); err != nil {
		t.Fatal(err)
	}
	if message["model"] != "claude-sonnet-4-6" || message["stop_reason"] != "end_turn" {
		t.Fatalf("unexpected message: %s", got)
	}
	content := message["content"].([]any)[0].(map[string]any)
	if content["text"] != "BRIDGE_OK" {
		t.Fatalf("unexpected content: %#v", content)
	}
}

func TestOpenAIStreamToClaude(t *testing.T) {
	source := "data: {\"id\":\"chatcmpl_2\",\"choices\":[{\"delta\":{\"content\":\"STREAM_\"}}]}\n\n" +
		"data: {\"id\":\"chatcmpl_2\",\"choices\":[{\"delta\":{\"content\":\"OK\"},\"finish_reason\":\"stop\"}],\"usage\":{\"prompt_tokens\":7,\"completion_tokens\":2}}\n\n" +
		"data: [DONE]\n\n"
	got, err := openAIStreamToClaude([]byte(source), "claude-sonnet-4-6")
	if err != nil {
		t.Fatal(err)
	}
	text := string(got)
	for _, expected := range []string{"event: message_start", "event: content_block_delta", "STREAM_OK", "event: message_stop"} {
		if !strings.Contains(text, expected) {
			t.Fatalf("missing %q in stream: %s", expected, text)
		}
	}
}

func TestClaudeDesktopModelAliasDoesNotRewriteUnknownClaudeModels(t *testing.T) {
	for _, model := range []string{
		"claude-haiku-4-5-20251001",
		"claude-fable-5-dd-weiver-otua-xedoc",
		"anthropic/claude-unconfigured",
	} {
		if got, ok := claudeDesktopModelAlias(model); ok {
			t.Fatalf("unexpected alias for %s: %s", model, got)
		}
	}
}

func TestApplyModelAliasRewritesExplicitGPTRouteOnMessages(t *testing.T) {
	request := httptest.NewRequest(
		http.MethodPost,
		"http://example.test/v1/messages",
		strings.NewReader(`{"model":"claude-opus-4-8","messages":[]}`),
	)
	applyModelAlias(request)

	var payload map[string]any
	if err := json.NewDecoder(request.Body).Decode(&payload); err != nil {
		t.Fatal(err)
	}
	if got := payload["model"]; got != "gpt-5.6-sol" {
		t.Fatalf("rewritten model = %v, want gpt-5.6-sol", got)
	}
}

func TestApplyModelAliasRoutesEnabledThinkingToNativeClaude(t *testing.T) {
	for _, thinking := range []string{
		`{"type":"enabled","budget_tokens":2048}`,
		`{"type":"adaptive"}`,
		`true`,
	} {
		request := httptest.NewRequest(
			http.MethodPost,
			"http://example.test/v1/messages",
			strings.NewReader(`{"model":"claude-opus-4-6","thinking":`+thinking+`,"messages":[]}`),
		)
		applyModelAlias(request)

		var payload map[string]any
		if err := json.NewDecoder(request.Body).Decode(&payload); err != nil {
			t.Fatal(err)
		}
		if got := payload["model"]; got != "claude-antigravity-opus-4-6-thinking" {
			t.Fatalf("thinking request model = %v, want claude-antigravity-opus-4-6-thinking", got)
		}
		if _, ok := payload["thinking"]; !ok {
			t.Fatal("Opus thinking configuration was stripped unexpectedly")
		}
	}
}

func TestApplyModelAliasStripsSonnetThinkingEffortOnMessages(t *testing.T) {
	request := httptest.NewRequest(
		http.MethodPost,
		"http://example.test/v1/messages",
		strings.NewReader(`{
			"model":"claude-sonnet-4-6",
			"thinking":{"type":"adaptive"},
			"output_config":{"effort":"high","format":{"type":"json_schema"}},
			"reasoning_effort":"high",
			"effort":"low",
			"messages":[]
		}`),
	)
	applyModelAlias(request)

	var payload map[string]any
	if err := json.NewDecoder(request.Body).Decode(&payload); err != nil {
		t.Fatal(err)
	}
	if got := payload["model"]; got != "claude-antigravity-sonnet-4-6" {
		t.Fatalf("rewritten model = %v, want claude-antigravity-sonnet-4-6", got)
	}
	for _, field := range []string{"thinking", "reasoning_effort", "effort"} {
		if _, ok := payload[field]; ok {
			t.Fatalf("Sonnet Messages payload retained %s: %#v", field, payload)
		}
	}
	outputConfig, ok := payload["output_config"].(map[string]any)
	if !ok {
		t.Fatalf("non-effort output_config was lost: %#v", payload)
	}
	if _, ok := outputConfig["effort"]; ok {
		t.Fatalf("output_config.effort was retained: %#v", outputConfig)
	}
	if _, ok := outputConfig["format"]; !ok {
		t.Fatalf("output_config.format was lost: %#v", outputConfig)
	}
}

func TestApplyModelAliasStripsSonnetThinkingSuffixOnMessages(t *testing.T) {
	for _, suffix := range []string{"low", "medium", "high", "8192", "auto"} {
		request := httptest.NewRequest(
			http.MethodPost,
			"http://example.test/v1/messages",
			strings.NewReader(`{
				"model":"claude-sonnet-4-6(`+suffix+`)",
				"thinking":{"type":"adaptive"},
				"output_config":{"effort":"`+suffix+`"},
				"messages":[]
			}`),
		)
		applyModelAlias(request)

		var payload map[string]any
		if err := json.NewDecoder(request.Body).Decode(&payload); err != nil {
			t.Fatal(err)
		}
		if got := payload["model"]; got != "claude-antigravity-sonnet-4-6" {
			t.Fatalf("suffix %s: rewritten model = %v", suffix, got)
		}
		if _, ok := payload["thinking"]; ok {
			t.Fatalf("suffix %s: request retained thinking", suffix)
		}
		if _, ok := payload["output_config"]; ok {
			t.Fatalf("suffix %s: request retained effort-only output_config", suffix)
		}
	}
}

func TestApplyModelAliasStripsSonnetEffortFromGzipMessages(t *testing.T) {
	var compressed bytes.Buffer
	gz := gzip.NewWriter(&compressed)
	if _, err := gz.Write([]byte(`{
		"model":"claude-sonnet-4-6",
		"thinking":{"type":"adaptive"},
		"output_config":{"effort":"low"},
		"messages":[]
	}`)); err != nil {
		t.Fatal(err)
	}
	if err := gz.Close(); err != nil {
		t.Fatal(err)
	}

	request := httptest.NewRequest(
		http.MethodPost,
		"http://example.test/v1/messages",
		bytes.NewReader(compressed.Bytes()),
	)
	request.Header.Set("Content-Encoding", "gzip")
	applyModelAlias(request)

	if got := request.Header.Get("Content-Encoding"); got != "" {
		t.Fatalf("rewritten request retained Content-Encoding: %q", got)
	}
	var payload map[string]any
	if err := json.NewDecoder(request.Body).Decode(&payload); err != nil {
		t.Fatal(err)
	}
	if got := payload["model"]; got != "claude-antigravity-sonnet-4-6" {
		t.Fatalf("rewritten model = %v", got)
	}
	if _, ok := payload["thinking"]; ok {
		t.Fatal("gzip request retained thinking")
	}
	if _, ok := payload["output_config"]; ok {
		t.Fatal("gzip request retained effort-only output_config")
	}
}

func TestApplyModelAliasHandlesIngressDecompressedGzipMessages(t *testing.T) {
	request := httptest.NewRequest(
		http.MethodPost,
		"http://example.test/v1/messages",
		strings.NewReader(`{
			"model":"claude-sonnet-4-6",
			"thinking":{"type":"adaptive"},
			"output_config":{"effort":"low"},
			"messages":[]
		}`),
	)
	// Simulate an ingress that decompressed the bytes but preserved the header.
	request.Header.Set("Content-Encoding", "gzip")
	applyModelAlias(request)

	if got := request.Header.Get("Content-Encoding"); got != "" {
		t.Fatalf("rewritten request retained Content-Encoding: %q", got)
	}
	var payload map[string]any
	if err := json.NewDecoder(request.Body).Decode(&payload); err != nil {
		t.Fatal(err)
	}
	if got := payload["model"]; got != "claude-antigravity-sonnet-4-6" {
		t.Fatalf("rewritten model = %v", got)
	}
	if _, ok := payload["thinking"]; ok {
		t.Fatal("ingress-decompressed request retained thinking")
	}
	if _, ok := payload["output_config"]; ok {
		t.Fatal("ingress-decompressed request retained effort-only output_config")
	}
}

func TestApplyModelAliasDetectsGzipWithoutEncodingHeader(t *testing.T) {
	var compressed bytes.Buffer
	gz := gzip.NewWriter(&compressed)
	_, _ = gz.Write([]byte(`{
		"model":"claude-sonnet-4-6",
		"output_config":{"effort":"low"},
		"messages":[]
	}`))
	if err := gz.Close(); err != nil {
		t.Fatal(err)
	}
	request := httptest.NewRequest(
		http.MethodPost,
		"http://example.test/v1/messages",
		bytes.NewReader(compressed.Bytes()),
	)
	applyModelAlias(request)

	var payload map[string]any
	if err := json.NewDecoder(request.Body).Decode(&payload); err != nil {
		t.Fatal(err)
	}
	if got := payload["model"]; got != "claude-antigravity-sonnet-4-6" {
		t.Fatalf("rewritten model = %v", got)
	}
}

func TestApplyModelAliasLeavesSonnetThinkingAloneOutsideMessages(t *testing.T) {
	request := httptest.NewRequest(
		http.MethodPost,
		"http://example.test/v1/chat/completions",
		strings.NewReader(`{
			"model":"claude-sonnet-4-6",
			"thinking":{"type":"adaptive"},
			"output_config":{"effort":"high"},
			"messages":[]
		}`),
	)
	applyModelAlias(request)

	var payload map[string]any
	if err := json.NewDecoder(request.Body).Decode(&payload); err != nil {
		t.Fatal(err)
	}
	if got := payload["model"]; got != "claude-sonnet-4-6" {
		t.Fatalf("non-Messages model changed unexpectedly: %v", got)
	}
	if _, ok := payload["thinking"]; !ok {
		t.Fatal("non-Messages thinking configuration was stripped unexpectedly")
	}
	outputConfig, ok := payload["output_config"].(map[string]any)
	if !ok || outputConfig["effort"] != "high" {
		t.Fatalf("non-Messages output_config changed unexpectedly: %#v", payload)
	}
}

func TestApplyModelAliasKeepsDisabledThinkingOnNativeOpus(t *testing.T) {
	request := httptest.NewRequest(
		http.MethodPost,
		"http://example.test/v1/messages",
		strings.NewReader(`{"model":"claude-opus-4-6","thinking":{"type":"disabled"},"messages":[]}`),
	)
	applyModelAlias(request)

	var payload map[string]any
	if err := json.NewDecoder(request.Body).Decode(&payload); err != nil {
		t.Fatal(err)
	}
	if got := payload["model"]; got != "claude-antigravity-opus-4-6" {
		t.Fatalf("disabled thinking request model = %v, want claude-antigravity-opus-4-6", got)
	}
}

func TestApplyModelAliasLeavesClaudeOpusRouteAloneOutsideMessages(t *testing.T) {
	request := httptest.NewRequest(
		http.MethodPost,
		"http://example.test/v1/responses",
		strings.NewReader(`{"model":"claude-opus-4-6","input":"hello"}`),
	)
	applyModelAlias(request)

	var payload map[string]any
	if err := json.NewDecoder(request.Body).Decode(&payload); err != nil {
		t.Fatal(err)
	}
	if got := payload["model"]; got != "claude-opus-4-6" {
		t.Fatalf("non-Messages model changed unexpectedly: %v", got)
	}
}

func TestAddFastModelAliasesIncludesClaudeDesktopAliases(t *testing.T) {
	resp := &http.Response{
		Request: &http.Request{},
		Body: io.NopCloser(strings.NewReader(`{
			"object": "list",
			"data": [
				{"id":"gpt-5.6-sol","object":"model","created":1,"owned_by":"openai"},
				{"id":"gpt-5.6-luna","object":"model","created":1,"owned_by":"openai"}
			]
		}`)),
		Header: make(http.Header),
	}

	if err := addFastModelAliases(resp); err != nil {
		t.Fatal(err)
	}
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		t.Fatal(err)
	}
	text := string(body)
	for _, model := range []string{
		"claude-sonnet-4-6",
		"claude-opus-4-6",
		"claude-opus-4-6-thinking",
		"claude-opus-4-8",
	} {
		if !strings.Contains(text, model) {
			t.Fatalf("expected model list to include %s: %s", model, text)
		}
	}
}

func TestDisableFrontendCachingForSPAAndAssets(t *testing.T) {
	for _, testCase := range []struct {
		path        string
		contentType string
	}{
		{path: "/account/keys", contentType: "text/html; charset=utf-8"},
		{path: "/assets/index.js", contentType: "text/javascript; charset=utf-8"},
		{path: "/assets/index.css", contentType: "text/css; charset=utf-8"},
	} {
		resp := &http.Response{
			Request: &http.Request{URL: &url.URL{Path: testCase.path}},
			Header:  http.Header{"Content-Type": []string{testCase.contentType}},
		}
		disableFrontendCaching(resp)
		if got := resp.Header.Get("Cache-Control"); got != "no-store, no-cache, must-revalidate, max-age=0" {
			t.Fatalf("%s Cache-Control = %q", testCase.path, got)
		}
		if got := resp.Header.Get("Pragma"); got != "no-cache" {
			t.Fatalf("%s Pragma = %q", testCase.path, got)
		}
		if got := resp.Header.Get("Expires"); got != "0" {
			t.Fatalf("%s Expires = %q", testCase.path, got)
		}
	}
}

func TestDisableFrontendCachingLeavesAPIResponsesUntouched(t *testing.T) {
	resp := &http.Response{
		Request: &http.Request{URL: &url.URL{Path: "/v1/models"}},
		Header:  http.Header{"Content-Type": []string{"application/json"}},
	}
	disableFrontendCaching(resp)
	if got := resp.Header.Get("Cache-Control"); got != "" {
		t.Fatalf("API Cache-Control changed unexpectedly: %q", got)
	}
}

func TestLoadClaudeAliasesFromMappingFile(t *testing.T) {
	path := filepath.Join(t.TempDir(), "aliases.json")
	if err := os.WriteFile(path, []byte(`{
		"claude-opus-4-8": "gpt-5.6-sol",
		"anthropic/claude-custom": "gpt-5.5"
	}`), 0o600); err != nil {
		t.Fatal(err)
	}

	aliases := loadClaudeAliases(path)
	got := map[string]string{}
	for _, alias := range aliases {
		got[alias.ID] = alias.Base
	}
	if got["claude-opus-4-8"] != "gpt-5.6-sol" {
		t.Fatalf("claude-opus-4-8 = %s", got["claude-opus-4-8"])
	}
	if got["anthropic/claude-custom"] != "gpt-5.5" {
		t.Fatalf("anthropic/claude-custom = %s", got["anthropic/claude-custom"])
	}
}

func TestLoadClaudeAliasesMergesDefaultsAndLetsConfigOverride(t *testing.T) {
	path := filepath.Join(t.TempDir(), "aliases.json")
	if err := os.WriteFile(path, []byte(`{
		"claude-opus-4-6": "gpt-5.6-sol",
		"claude-opus-4-6-thinking": "gpt-5.6-terra",
		"anthropic/claude-custom": "gpt-5.5"
	}`), 0o600); err != nil {
		t.Fatal(err)
	}

	aliases := loadClaudeAliases(path)
	got := map[string]string{}
	for _, alias := range aliases {
		got[alias.ID] = alias.Base
	}
	if got["claude-opus-4-8"] != "gpt-5.6-sol" {
		t.Fatalf("new default alias was lost: %#v", got)
	}
	if got["claude-opus-4-6"] != "claude-antigravity-opus-4-6" {
		t.Fatalf("native Claude route was not protected: %#v", got)
	}
	if got["claude-opus-4-6-thinking"] != "claude-antigravity-opus-4-6-thinking" {
		t.Fatalf("thinking Claude route was not protected: %#v", got)
	}
	if got["anthropic/claude-custom"] != "gpt-5.5" {
		t.Fatalf("custom alias was lost: %#v", got)
	}
}
