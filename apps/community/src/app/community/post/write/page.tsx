"use client";

import dynamic from "next/dynamic";

const PostForm = dynamic(() => import("@/src/widgets/PostForm"), {
  ssr: false,
});

export default function CreatePostPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <h1 className="mb-6 text-2xl font-bold">새 글 작성</h1>
      <PostForm />
    </div>
  );
}
