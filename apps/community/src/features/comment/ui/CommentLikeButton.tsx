"use client";

import { Button } from "@packages/ui";
import { HeartIcon } from "lucide-react";
import { useReducer, useTransition } from "react";

import { toggleCommentLike } from "../action";

interface CommentLikeButtonProps {
  commentId: string;
  postId: string;
  initialLikes: number;
  initialIsLiked: boolean;
  isAuthenticated?: boolean;
}

interface LikeState {
  likes: number;
  isLiked: boolean;
}

type LikeAction =
  | { type: "TOGGLE" }
  | { type: "REVERT" }
  | { type: "SET"; payload: LikeState };

function likeReducer(state: LikeState, action: LikeAction): LikeState {
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

export function CommentLikeButton({
  commentId,
  postId,
  initialLikes,
  initialIsLiked,
  isAuthenticated = false,
}: CommentLikeButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [state, dispatch] = useReducer(likeReducer, {
    likes: initialLikes,
    isLiked: initialIsLiked,
  });

  const handleLike = () => {
    if (!isAuthenticated) {
      return;
    }

    startTransition(async () => {
      dispatch({ type: "TOGGLE" });

      try {
        await toggleCommentLike(commentId, postId);
      } catch (error) {
        dispatch({ type: "REVERT" });
        console.error("댓글 좋아요 처리 중 오류 발생:", error);
      }
    });
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLike}
      aria-label={state.isLiked ? "좋아요 취소" : "좋아요"}
      disabled={isPending || !isAuthenticated}
      className={`flex items-center gap-2 ${
        !isAuthenticated ? "cursor-default opacity-50" : ""
      }`}
    >
      <HeartIcon className={state.isLiked ? "fill-current text-red-500" : ""} />
      <span>{state.likes}</span>
    </Button>
  );
}
