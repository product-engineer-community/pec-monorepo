"use client";

import { Button } from "@pec/shared";
import { HeartIcon } from "lucide-react";
import { useEffect, useState, useTransition } from "react";

import { togglePostLike } from "../action";

interface PostLikeButtonProps {
  postId: string;
  initialLikes: number;
  initialIsLiked: boolean;
  size?: "sm" | "icon";
}

/**
 * 게시물 좋아요 버튼 컴포넌트
 * 질문, 토론 등 모든 종류의 게시물에 사용 가능
 */
export function PostLikeButton({
  postId,
  initialLikes,
  initialIsLiked,
  size = "icon",
}: PostLikeButtonProps) {
  const [likesCount, setLikesCount] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setLikesCount(initialLikes);
    setIsLiked(initialIsLiked);
  }, [initialLikes, initialIsLiked]);

  const handleToggleLike = () => {
    // Optimistic update
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    setLikesCount(newIsLiked ? likesCount + 1 : likesCount - 1);

    startTransition(async () => {
      try {
        const result = await togglePostLike(postId);

        if (result.error) {
          // 에러 발생 시 원래 상태로 롤백
          setIsLiked(isLiked);
          setLikesCount(likesCount);
          console.error("좋아요 처리 실패:", result.error);
          return;
        }

        // 서버 응답으로 상태 확정
        if (result.isLiked !== undefined) {
          setIsLiked(result.isLiked);
          setLikesCount(result.isLiked ? initialLikes + 1 : initialLikes - 1);
        }
      } catch (error) {
        // 예외 발생 시 원래 상태로 롤백
        setIsLiked(isLiked);
        setLikesCount(likesCount);
        console.error("좋아요 처리 중 오류 발생:", error);
      }
    });
  };

  return (
    <Button
      variant="ghost"
      size={size}
      onClick={handleToggleLike}
      disabled={isPending}
      className="flex items-center gap-2"
    >
      <HeartIcon className={isLiked ? "fill-current" : ""} />
      <span>{likesCount}</span>
    </Button>
  );
}
