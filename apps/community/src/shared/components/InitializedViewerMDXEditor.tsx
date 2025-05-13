"use client";

import {
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  headingsPlugin,
  linkPlugin,
  listsPlugin,
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
  quotePlugin,
} from "@mdxeditor/editor";
import type { ForwardedRef } from "react";

export default function InitializedViewerMDXEditor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  return (
    <MDXEditor
      readOnly
      contentEditableClassName="prose prose-sm max-w-none prose-ul:list-disc prose-ol:list-decimal pl-5"
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        codeBlockPlugin(),
        codeMirrorPlugin({
          codeBlockLanguages: {
            js: "JavaScript",
            jsx: "JSX",
            ts: "TypeScript",
            tsx: "TSX",
            css: "CSS",
            html: "HTML",
            json: "JSON",
          },
        }),
        linkPlugin(),
        diffSourcePlugin(),
      ]}
      {...props}
      ref={editorRef}
    />
  );
}
