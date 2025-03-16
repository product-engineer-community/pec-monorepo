"use client";

import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import ReactMarkdown from "react-markdown";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
);

interface EditorProps {
  content: string;
  onChange: (value: string) => void;
}

export function Editor({ content, onChange }: EditorProps) {
  return (
    <div data-color-mode="dark">
      <MDEditor
        value={content}
        onChange={(value) => onChange(value || "")}
        preview="edit"
        height={400}
      />
    </div>
  );
}

interface MarkdownViewerProps {
  content: string;
}

export function MarkdownViewer({ content }: MarkdownViewerProps) {
  return (
    <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl max-w-none">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
