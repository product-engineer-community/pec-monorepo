"use client";

import { useAuth } from "@packages/auth/src/features";
import { Button } from "@packages/ui";
import { HeartIcon } from "lucide-react";
import { useReducer, useTransition } from "react";

import { togglePostLike } from "../action";

interface PostLikeButtonProps {
  postId: string;
  initialLikes: number;
  initialIsLiked: boolean;
}

interface LikeState {
  likes: number;
  isLiked: boolean;
}

type LikeAction =
  | { type: "TOGGLE" }
  | { type: "REVERT" }
  | { type: "SET"; payload: LikeState };

function likeReducer(state: LikeState, action: LikeAction) {
  switch (action.type) {
    case "TOGGLE":
      return {
        isLiked: !state.isLiked,
        likes: state.isLiked ? state.likes - 1 : state.likes + 1,
      };
    case "REVERT":
      return {
        isLiked: !state.isLiked,
        likes: state.isLiked ? state.likes - 1 : state.likes + 1,
      };
    case "SET":
      return action.payload;
    default:
      return state;
  }
}

export function PostLikeButton({
  postId,
  initialLikes,
  initialIsLiked,
}: PostLikeButtonProps) {
  const { isAuthenticated } = useAuth();
  const [isPending, startTransition] = useTransition();
  const [state, dispatch] = useReducer(likeReducer, {
    likes: initialLikes,
    isLiked: initialIsLiked,
  });

  const handleToggleLike = async () => {
    if (!isAuthenticated) {
      return;
    }

    startTransition(async () => {
      dispatch({ type: "TOGGLE" });

      try {
        const result = await togglePostLike(postId);

        if (result.error) {
          dispatch({ type: "REVERT" });
          console.error("좋아요 처리 실패:", result.error);
        }
      } catch (error) {
        dispatch({ type: "REVERT" });
        console.error("좋아요 처리 중 오류 발생:", error);
      }
    });
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggleLike}
      aria-label={state.isLiked ? "좋아요 취소" : "좋아요"}
      disabled={isPending}
      className={`flex items-center gap-2 ${
        !isAuthenticated ? "cursor-default opacity-50" : ""
      }`}
    >
      <HeartIcon className={state.isLiked ? "fill-current text-red-500" : ""} />
      <span>{state.likes}</span>
    </Button>
  );
}
