"use client";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import "highlight.js/styles/atom-one-dark.css";

import { Button } from "@pec/ui";
import { Code } from "lucide-react";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface EditorProps {
  content: string;
  onChange: (value: string) => void;
}

export function Editor({ content, onChange }: EditorProps) {
  return (
    <div className="space-y-2">
      <Button
        variant="ghost"
        size="sm"
        type="button"
        onClick={() => {
          const textarea = document.querySelector(
            "textarea.w-md-editor-text-input",
          ) as HTMLTextAreaElement;
          if (!textarea) return;

          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          const text = textarea.value;
          const before = text.substring(0, start);
          const selected = text.substring(start, end);
          const after = text.substring(end);

          const codeBlock = "\n```\n" + selected + "\n```\n";
          const newText = before + codeBlock + after;
          onChange?.(newText);

          setTimeout(() => {
            textarea.selectionStart = start + 5;
            textarea.selectionEnd = start + 5 + selected.length;
            textarea.focus();
          }, 0);
        }}
      >
        <Code className="mr-2 h-4 w-4" />
        코드블럭 추가
      </Button>
      <MDEditor
        hideToolbar
        value={content}
        onChange={(value) => onChange(value || "")}
        preview="edit"
        extraCommands={[]}
        previewOptions={{
          allowedElements: ["p", "code", "pre"],
        }}
        textareaProps={{
          placeholder: "내용을 입력하세요",
        }}
      />
    </div>
  );
}

interface MarkdownViewerProps {
  content: string;
}

export function MarkdownViewer({ content }: MarkdownViewerProps) {
  return (
    <div className="prose prose-sm max-w-none [&>p]:my-2 [&>p]:text-[14px] [&>pre>code]:text-[14px]">
      <ReactMarkdown
        rehypePlugins={[[rehypeHighlight, { detect: true }]]} // <- sync 플러그인
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
