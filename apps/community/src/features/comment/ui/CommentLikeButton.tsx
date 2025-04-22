"use client";

import { Button } from "@pec/shared";
import { HeartIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { toggleCommentLike } from "../action";

interface CommentLikeButtonProps {
  commentId: string;
  postId: string;
  initialLikes: number;
  initialIsLiked: boolean;
}

export function CommentLikeButton({
  commentId,
  postId,
  initialLikes,
  initialIsLiked,
}: CommentLikeButtonProps) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likesCount, setLikesCount] = useState(initialLikes);
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async () => {
    try {
      setIsLoading(true);
      await toggleCommentLike(commentId, postId);

      // 낙관적 업데이트
      setIsLiked(!isLiked);
      setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    } catch (error) {
      toast.error("좋아요 처리 중 오류가 발생했습니다.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleLike}
      disabled={isLoading}
      aria-label={isLiked ? "좋아요 취소" : "좋아요"}
    >
      <HeartIcon className={isLiked ? "fill-current text-red-500" : ""} />
      <span className="ml-1">{likesCount}</span>
    </Button>
  );
}
