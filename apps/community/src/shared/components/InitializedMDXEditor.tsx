"use client";

import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  codeBlockPlugin,
  codeMirrorPlugin,
  CodeToggle,
  CreateLink,
  headingsPlugin,
  imagePlugin,
  InsertCodeBlock,
  linkPlugin,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
  quotePlugin,
  toolbarPlugin,
  UndoRedo,
} from "@mdxeditor/editor";
import { useEffect, useRef } from "react";

export default function InitializedMDXEditor({ ...props }: MDXEditorProps) {
  const imageUploadHandler = async (image: File) => {
    const formData = new FormData();
    formData.append("image", image);
    // send the file to your server and return
    // the URL of the uploaded image in the response
    const response = await fetch("/api/upload/image", {
      method: "POST",
      body: formData,
    });
    const json = (await response.json()) as { url: string };
    return json.url;
  };

  const internalRef = useRef<MDXEditorMethods>(null);
  useEffect(() => {
    if (internalRef.current) {
      internalRef.current.setMarkdown(props.markdown);
    }
  }, [props.markdown]);

  return (
    <MDXEditor
      contentEditableClassName="prose prose-sm max-w-none prose-ul:list-disc prose-ol:list-decimal pl-5"
      plugins={[
        imagePlugin({ imageUploadHandler }),
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        markdownShortcutPlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: "tsx" }),
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
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <UndoRedo />
              <BoldItalicUnderlineToggles />
              <CodeToggle />
              <ListsToggle />
              <BlockTypeSelect />
              <CreateLink />
              <InsertCodeBlock />
            </>
          ),
        }),
      ]}
      {...props}
      ref={internalRef}
    />
  );
}
