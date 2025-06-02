import {
  getRelativeTimeString,
  postType as postTypeSchema,
} from "@packages/ui"; // Import PostType for post.type comparison
import Image from "next/image";
import Link from "next/link";

import { Post } from "@/entities/post/model"; // Import the Post type
import { MarkdownViewer } from "@/shared/components/editor";

interface PostListItemProps {
  post: Post;
  basePath: string; // e.g., "/community/productivity"
}

export function PostListItem({ post, basePath }: PostListItemProps) {
  const isArticle = post.type === postTypeSchema.Enum.article;

  return (
    <Link href={`${basePath}/${post.id}`} className="block">
      <div className="rounded-lg border p-6 transition-colors hover:border-primary">
        {isArticle && post.thumbnail_url && (
          <div className="relative mb-4">
            <Image
              src={post.thumbnail_url}
              alt={`${post.title} thumbnail`}
              className="h-auto max-h-60 w-full rounded-md"
              fill
              objectFit="cover"
            />
          </div>
        )}
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="mb-2 text-xl font-semibold">{post.title}</h2>
            <div className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
              <span>{post.author.username}</span>
              <span className="hidden sm:inline">•</span>
              <span>{getRelativeTimeString(post.created_at)}</span>
              {post.type === postTypeSchema.Enum.productivity && (
                <>
                  <span className="hidden sm:inline">•</span>
                  <span>Productivity</span>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-shrink-0 gap-4 text-sm text-muted-foreground">
            <span>{post.views_count} views</span>
            <span>{post.likes_count} likes</span>
            <span>{post.comments_count} comments</span>
          </div>
        </div>
        {!isArticle &&
          post.content && ( // Show content snippet if not an article (articles might rely more on thumbnail)
            <div className="prose prose-sm max-w-none dark:prose-invert">
              {/* Limiting content length for snippet display */}
              <MarkdownViewer
                content={
                  post.content.substring(0, 200) +
                  (post.content.length > 200 ? "..." : "")
                }
              />
            </div>
          )}
        {isArticle &&
          post.content && ( // For articles, maybe a shorter snippet or different presentation
            <p className="text-sm text-muted-foreground">
              {post.content.substring(0, 150) +
                (post.content.length > 150 ? "..." : "")}
            </p>
          )}
      </div>
    </Link>
  );
}
