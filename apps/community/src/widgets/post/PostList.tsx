import { PostCardSkeleton, PostType } from "@packages/ui"; // Import PostType
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { getPosts } from "@/entities/post/action"; // Ensure this path is correct

import { PostListItem } from "./PostListItem"; // Import the new PostListItem

interface PostListContentProps {
  postTypeToFetch: PostType;
  basePath: string;
}

async function PostListContent({
  postTypeToFetch,
  basePath,
}: PostListContentProps) {
  const posts = await getPosts(postTypeToFetch);

  if (!posts || posts.length === 0) {
    notFound();
  }

  return (
    <>
      {posts.map((post) => (
        <PostListItem key={post.id} post={post} basePath={basePath} />
      ))}
    </>
  );
}

interface PostListProps {
  postTypeToFetch: Exclude<PostType, "article">;
  basePath: string;
}

export function PostList({ postTypeToFetch, basePath }: PostListProps) {
  return (
    <div className="space-y-6">
      <Suspense fallback={<PostCardSkeleton count={3} />}>
        <PostListContent
          postTypeToFetch={postTypeToFetch}
          basePath={basePath}
        />
      </Suspense>
    </div>
  );
}
