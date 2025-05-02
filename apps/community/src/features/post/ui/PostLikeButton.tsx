"use client";

import { Button } from "@pec/shared";
import { HeartIcon } from "lucide-react";
import { useEffect, useOptimistic, useTransition } from "react";

import { togglePostLike } from "../action";

interface PostLikeButtonProps {
  postId: string;
  initialLikes: number;
  initialIsLiked: boolean;
}

/**
 * 게시물 좋아요 버튼 컴포넌트
 * 질문, 토론 등 모든 종류의 게시물에 사용 가능
 */
export function PostLikeButton({
  postId,
  initialLikes,
  initialIsLiked,
}: PostLikeButtonProps) {
  const [isPending, startTransition] = useTransition();

  // 낙관적 UI 업데이트를 위한 상태 설정
  const [optimisticState, updateOptimisticState] = useOptimistic(
    { likes: initialLikes, isLiked: initialIsLiked },
    (state, action: "like" | "unlike") => {
      if (action === "like") {
        return { likes: state.likes + 1, isLiked: true };
      } else {
        return { likes: state.likes - 1, isLiked: false };
      }
    },
  );

  // 초기값 변경 시 optimisticState 업데이트
  useEffect(() => {
    // 서버에서 새로운 초기값이 전달되면 낙관적 상태도 업데이트
    updateOptimisticState(initialIsLiked ? "like" : "unlike");
  }, [initialLikes, initialIsLiked, updateOptimisticState]);

  const handleToggleLike = () => {
    // 낙관적 업데이트 - 현재 상태의 반대 값으로 토글
    updateOptimisticState(optimisticState.isLiked ? "unlike" : "like");

    startTransition(async () => {
      try {
        const result = await togglePostLike(postId);

        if (result.error) {
          // 에러 발생 시 서버 상태로 강제 복원
          updateOptimisticState(initialIsLiked ? "like" : "unlike");
          console.error("좋아요 처리 실패:", result.error);
          return;
        }

        // 서버 응답으로 상태 확정 (롤백이 필요한 경우)
        if (
          result.isLiked !== undefined &&
          result.isLiked !== optimisticState.isLiked
        ) {
          updateOptimisticState(result.isLiked ? "like" : "unlike");
        }
      } catch (error) {
        // 예외 발생 시 서버 상태로 복원
        updateOptimisticState(initialIsLiked ? "like" : "unlike");
        console.error("좋아요 처리 중 오류 발생:", error);
      }
    });
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggleLike}
      disabled={isPending}
      className="flex items-center gap-2"
    >
      <HeartIcon className={optimisticState.isLiked ? "fill-current" : ""} />
      <span>{optimisticState.likes}</span>
    </Button>
  );
}
