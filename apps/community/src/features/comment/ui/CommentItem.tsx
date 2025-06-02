"use client";

import Image from "next/image";
import { useState } from "react";

import { getRelativeTime } from "@/shared/libs/date";
import { MarkdownViewer } from "@/src/shared/components/editor";

import { CommentWithAuthor } from "../model/types";
import { CommentDeleteButton } from "./CommentDeleteButton";
import { CommentForm } from "./CommentForm";
import { CommentLikeButton } from "./CommentLikeButton";
import { CommentReplyButton } from "./CommentReplyButton";

interface CommentItemProps {
  comment: CommentWithAuthor;
  postId: string;
  currentUserId?: string;
  isReply?: boolean;
}

export function CommentItem({
  comment,
  postId,
  currentUserId,
  isReply = false,
}: CommentItemProps) {
  const [isReplying, setIsReplying] = useState(false);

  const handleReply = () => {
    setIsReplying(true);
  };

  const handleCancelReply = () => {
    setIsReplying(false);
  };

  return (
    <div className={`rounded-lg border p-4 ${isReply ? "ml-8" : ""}`}>
      <div className="mb-2 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 overflow-hidden rounded-full bg-muted">
            {comment.author.avatar_url ? (
              <div className="relative flex h-full w-full items-center justify-center">
                <Image
                  fill
                  objectFit="cover"
                  src={comment.author.avatar_url}
                  alt={comment.author.username}
                />
              </div>
            ) : (
              <div className="flex h-full w-full items-center justify-center font-semibold">
                {comment.author.username?.[0]?.toUpperCase()}
              </div>
            )}
          </div>
          <div>
            <span className="font-semibold">{comment.author.username}</span>
            <span className="ml-2 text-sm text-muted-foreground">
              {getRelativeTime(comment.created_at)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CommentLikeButton
            commentId={comment.id}
            postId={postId}
            initialLikes={comment.likes_count}
            initialIsLiked={comment.is_liked}
            isAuthenticated={Boolean(currentUserId)}
          />
          {!isReply && (
            <CommentReplyButton
              commentId={comment.id}
              onReply={handleReply}
              disabled={!currentUserId}
            />
          )}
          <CommentDeleteButton
            commentId={comment.id}
            postId={postId}
            authorId={comment.author_id}
            currentUserId={currentUserId}
          />
        </div>
      </div>
      <div className="prose dark:prose-invert">
        <MarkdownViewer content={comment.content} />
      </div>

      {/* 답글 폼 */}
      {isReplying && !isReply && (
        <div className="mt-4">
          <CommentForm
            postId={postId}
            parentId={comment.id}
            onCancel={handleCancelReply}
          />
        </div>
      )}
    </div>
  );
}
