import {
  getRelativeTimeString,
  PostCardSkeleton,
  postType,
} from "@packages/ui";
import Link from "next/link";
import { Suspense } from "react";

import { getPosts } from "@/entities/post";
import { MarkdownViewer } from "@/shared/components/editor";

async function DiscussionsListContent() {
  const discussions = await getPosts(postType.Enum.discussion);

  return (
    <>
      {discussions.map((discussion) => (
        <Link
          key={discussion.id}
          href={`/discussions/${discussion.id}`}
          className="block"
        >
          <div className="rounded-lg border p-6 transition-colors hover:border-primary">
            <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="mb-2 text-xl font-semibold">
                  {discussion.title}
                </h2>
                <div className="mb-4 flex flex-wrap gap-2 text-sm text-muted-foreground">
                  <span>{discussion.author.username}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{getRelativeTimeString(discussion.created_at)}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{discussion.category}</span>
                </div>
                <div className="mb-4 flex flex-wrap gap-2">
                  {discussion.tags?.map((tag: string) => (
                    <span
                      key={tag}
                      className="rounded-md bg-secondary px-2 py-1 text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span>{discussion.views_count} views</span>
                <span>{discussion.likes_count} likes</span>
                <span>{discussion.comments_count} comments</span>
              </div>
            </div>
            <MarkdownViewer content={discussion.content} />
          </div>
        </Link>
      ))}
    </>
  );
}

export function DiscussionsList() {
  return (
    <div className="space-y-6">
      <Suspense
        fallback={
          <PostCardSkeleton count={3} variant={postType.Enum.discussion} />
        }
      >
        <DiscussionsListContent />
      </Suspense>
    </div>
  );
}
