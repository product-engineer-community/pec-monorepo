import { PostCardSkeleton, PostType } from "@packages/ui"; // Import PostType
import { Suspense } from "react";

import { getPosts } from "@/entities/post/action"; // Ensure this path is correct
import { PostListItem } from "./PostListItem"; // Import the new PostListItem

interface PostListContentProps {
  postTypeToFetch: PostType;
  basePath: string;
}

async function PostListContent({ postTypeToFetch, basePath }: PostListContentProps) {
  const posts = await getPosts(postTypeToFetch);

  if (!posts || posts.length === 0) {
    return <p className="text-center text-muted-foreground">No posts found in this category yet.</p>;
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
  postTypeToFetch: PostType;
  basePath: string;
}

export function PostList({ postTypeToFetch, basePath }: PostListProps) {
  return (
    <div className="space-y-6">
      <Suspense
        fallback={
          // Pass the postTypeToFetch to the variant prop of PostCardSkeleton
          <PostCardSkeleton count={3} variant={postTypeToFetch} />
        }
      >
        <PostListContent postTypeToFetch={postTypeToFetch} basePath={basePath} />
      </Suspense>
    </div>
  );
}
