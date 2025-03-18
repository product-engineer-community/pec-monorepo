"use client";

import dynamic from "next/dynamic";

const QuestionAndDiscussionForm = dynamic(
  () => import("@/src/widgets/QuestionAndDiscussionForm"),
  {
    ssr: false,
  },
);

export default function CreatePostPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <h1 className="mb-6 text-2xl font-bold">Create New Post</h1>
      <QuestionAndDiscussionForm />
    </div>
  );
}
