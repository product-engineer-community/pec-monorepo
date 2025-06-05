"use client";

import "@mdxeditor/editor/style.css";

import type { MDXEditorMethods, MDXEditorProps } from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import { forwardRef, useEffect, useRef } from "react";

// 에디터 동적 가져오기 (SSR 비활성화)
const MDXEditorComponent = dynamic(() => import("./InitializedMDXEditor"), {
  ssr: false,
});

// 뷰어용 에디터 동적 가져오기 (SSR 비활성화)
const MDXViewerComponent = dynamic(
  () => import("./InitializedViewerMDXEditor"),
  { ssr: false },
);

// 다른 컴포넌트에서 사용할 forwardRef 컴포넌트
const ForwardRefEditor = forwardRef<MDXEditorMethods, MDXEditorProps>(
  (props, ref) => {
    return <MDXEditorComponent {...props} ref={ref} />;
  },
);

ForwardRefEditor.displayName = "ForwardRefEditor";

// 에디터 Props
interface EditorProps {
  content: string;
  onChange: (value: string) => void;
}

/**
 * 마크다운 에디터 컴포넌트
 */
export function Editor({ content, onChange }: EditorProps) {
  const editorRef = useRef<MDXEditorMethods>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setMarkdown(content);
    }
  }, [content]);

  return (
    <div className="[&_.MarkdownEditor-content]:prose [&_.MarkdownEditor-content]:prose-sm [&_.MarkdownEditor-content]:max-w-none">
      <ForwardRefEditor
        markdown={content}
        onChange={onChange}
        placeholder="내용을 입력하세요"
        ref={editorRef}
      />
    </div>
  );
}

// 마크다운 뷰어 Props
interface MarkdownViewerProps {
  content: string;
}

/**
 * 마크다운 뷰어 컴포넌트
 */
export function MarkdownViewer({ content }: MarkdownViewerProps) {
  return (
    <div className="prose prose-sm max-w-none [&>p]:my-2 [&>p]:text-[14px] [&>pre>code]:text-[14px] [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5">
      <MDXViewerComponent markdown={content} editorRef={null} />
    </div>
  );
}
