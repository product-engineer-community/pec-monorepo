"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

import { PostWritePageTitle } from "@/entities/post/ui/PostWritePageTitle";

const PostForm = dynamic(() => import("@/src/widgets/PostForm"), {
  ssr: false,
});

export default function CreatePostPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <Suspense>
        <PostWritePageTitle />
      </Suspense>
      <PostForm />
    </div>
  );
}
