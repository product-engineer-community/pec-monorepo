"use client";

import { Button } from "@pec/ui";
import { HeartIcon } from "lucide-react";
import { useOptimistic, useTransition } from "react";

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
  const [optimisticState, addOptimistic] = useOptimistic(
    { likes: initialLikes, isLiked: initialIsLiked },
    (state, newAction: { type: "like" | "unlike" }) => {
      if (newAction.type === "like") {
        return { likes: state.likes + 1, isLiked: true };
      } else {
        return { likes: state.likes - 1, isLiked: false };
      }
    },
  );

  const handleToggleLike = () => {
    // 현재 좋아요 상태에 따라 반대 액션 수행
    const actionType = optimisticState.isLiked ? "unlike" : "like";

    startTransition(async () => {
      // 낙관적 UI 업데이트 먼저 적용
      addOptimistic({ type: actionType });

      try {
        // 서버 액션 실행
        const result = await togglePostLike(postId);

        if (result.error) {
          // 에러 발생 시 원래 상태로 되돌리기
          const revertType = actionType === "like" ? "unlike" : "like";
          addOptimistic({ type: revertType });
          console.error("좋아요 처리 실패:", result.error);
        }
      } catch (error) {
        // 예외 발생 시 원래 상태로 되돌리기
        const revertType = actionType === "like" ? "unlike" : "like";
        addOptimistic({ type: revertType });
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
