"use client";

import { getPostTypeDisplayName } from "@packages/constants";

import { usePostType } from "@/features/post/model/use-post-type";

export function PostWritePageTitle() {
  const postType = usePostType();
  const postTypeDisplayName = getPostTypeDisplayName(postType);

  return (
    <h1 className="mb-6 text-2xl font-bold">
      {postTypeDisplayName} 새 글 쓰기
    </h1>
  );
}
