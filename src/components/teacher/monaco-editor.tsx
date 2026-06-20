"use client";

import Editor, { type OnMount } from "@monaco-editor/react";
import type * as monaco from "monaco-editor";

// ---------------------------------------------------------------------------
// Custom theme aligned with the app's dark palette
// bg: #0a0a0c  |  accent: indigo-400 (#818cf8)  |  text: zinc-200 (#e4e4e7)
// ---------------------------------------------------------------------------
function defineTheme(m: typeof monaco) {
  m.editor.defineTheme("emergentes-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "52525b", fontStyle: "italic" },
      { token: "comment.doc", foreground: "52525b", fontStyle: "italic" },
      { token: "keyword", foreground: "818cf8" },
      { token: "keyword.control", foreground: "818cf8" },
      { token: "string", foreground: "86efac" },
      { token: "string.escape", foreground: "6ee7b7" },
      { token: "number", foreground: "f9a8d4" },
      { token: "type", foreground: "67e8f9" },
      { token: "type.identifier", foreground: "67e8f9" },
      { token: "function", foreground: "c084fc" },
      { token: "identifier", foreground: "e4e4e7" },
      { token: "delimiter", foreground: "a1a1aa" },
      { token: "operator", foreground: "818cf8" },
      // Markdown tokens
      { token: "keyword.md", foreground: "818cf8", fontStyle: "bold" },
      { token: "strong.md", foreground: "f4f4f5", fontStyle: "bold" },
      { token: "emphasis.md", foreground: "a1a1aa", fontStyle: "italic" },
      { token: "string.link.md", foreground: "67e8f9" },
      { token: "string.link.title.md", foreground: "67e8f9" },
      { token: "variable.md", foreground: "c084fc" },
      { token: "tag.md", foreground: "818cf8" },
      { token: "string.md", foreground: "e4e4e7" },
    ],
    colors: {
      "editor.background": "#0a0a0c",
      "editor.foreground": "#e4e4e7",
      "editor.lineHighlightBackground": "#ffffff08",
      "editor.selectionBackground": "#6366f128",
      "editor.selectionHighlightBackground": "#6366f114",
      "editor.findMatchBackground": "#6366f140",
      "editor.findMatchHighlightBackground": "#6366f120",
      "editorLineNumber.foreground": "#3f3f46",
      "editorLineNumber.activeForeground": "#71717a",
      "editorCursor.foreground": "#818cf8",
      "editorIndentGuide.background1": "#ffffff0a",
      "editorIndentGuide.activeBackground1": "#ffffff18",
      "editorBracketMatch.background": "#6366f118",
      "editorBracketMatch.border": "#818cf860",
      "editorGutter.background": "#0a0a0c",
      "scrollbarSlider.background": "#ffffff08",
      "scrollbarSlider.hoverBackground": "#ffffff12",
      "scrollbarSlider.activeBackground": "#ffffff18",
      "editorWidget.background": "#121214",
      "editorWidget.border": "#ffffff10",
      "editorSuggestWidget.background": "#121214",
      "editorSuggestWidget.border": "#ffffff10",
      "editorSuggestWidget.selectedBackground": "#6366f118",
      "editorSuggestWidget.highlightForeground": "#818cf8",
      "editorHoverWidget.background": "#121214",
      "editorHoverWidget.border": "#ffffff10",
      "minimap.background": "#0a0a0c",
      "peekViewEditor.background": "#0a0a0c",
      "peekViewResult.background": "#121214",
    },
  });
}

export interface MonacoEditorProps {
  value: string;
  onChange: (value: string) => void;
  /** Monaco language id. Defaults to "plaintext". */
  language?: string;
  /** CSS height string or pixel number. Defaults to 240. */
  height?: string | number;
  readOnly?: boolean;
  /** Wrap long lines (good for prose/markdown). */
  wordWrap?: "on" | "off";
  /** Show gutter line numbers. */
  lineNumbers?: boolean;
  /** Placeholder shown inside the editor when value is empty. */
  placeholder?: string;
}

let themeRegistered = false;

export function MonacoEditor({
  value,
  onChange,
  language = "plaintext",
  height = 240,
  readOnly = false,
  wordWrap = "off",
  lineNumbers = true,
}: MonacoEditorProps) {
  const handleMount: OnMount = (_editor, m) => {
    if (!themeRegistered) {
      defineTheme(m);
      themeRegistered = true;
    }
    m.editor.setTheme("emergentes-dark");
  };

  return (
    <div
      className="rounded-lg overflow-hidden border border-white/10 bg-[#0a0a0c]"
      style={{ height }}
    >
      {/* px-4 wrapper creates horizontal padding — Monaco fills its container,
          so the outer bg (#0a0a0c) acts as left/right padding  */}
      <div className="h-full px-4">
        <Editor
          height="100%"
          language={language}
          value={value}
          theme="emergentes-dark"
          onMount={handleMount}
          onChange={(v) => onChange(v ?? "")}
          loading={
            <div className="flex items-center justify-center h-full bg-[#0a0a0c]">
              <span className="text-xs text-zinc-600 tracking-wider">
                Loading editor…
              </span>
            </div>
          }
          options={{
            readOnly,
            minimap: { enabled: false },
            fontSize: 13,
            fontFamily:
              '"GeistMono", "Geist Mono", ui-monospace, "Cascadia Code", monospace',
            lineNumbers: lineNumbers ? "on" : "off",
            lineNumbersMinChars: lineNumbers ? 3 : 0,
            lineDecorationsWidth: lineNumbers ? 4 : 0,
            wordWrap,
            scrollBeyondLastLine: false,
            padding: { top: 14, bottom: 14 },
            renderLineHighlight: "none",
            overviewRulerLanes: 0,
            hideCursorInOverviewRuler: true,
            scrollbar: {
              verticalScrollbarSize: 4,
              horizontalScrollbarSize: 4,
              useShadows: false,
            },
            quickSuggestions: false,
            suggest: { showWords: false },
            renderWhitespace: "none",
            folding: false,
            contextmenu: false,
            links: true,
          }}
        />
      </div>
    </div>
  );
}
