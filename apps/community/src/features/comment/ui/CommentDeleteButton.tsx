"use client";

import { Button } from "@packages/ui";
import { TrashIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { deleteComment } from "../action";

interface CommentDeleteButtonProps {
  commentId: string;
  postId: string;
  authorId: string;
  currentUserId?: string;
}

export function CommentDeleteButton({
  commentId,
  postId,
  authorId,
  currentUserId,
}: CommentDeleteButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const canDelete = currentUserId && currentUserId === authorId;

  if (!canDelete) return null;

  const handleDelete = async () => {
    if (!window.confirm("정말 댓글을 삭제하시겠습니까?")) {
      return;
    }

    try {
      setIsLoading(true);
      await deleteComment(commentId, postId);
      toast.success("댓글이 삭제되었습니다.");
    } catch (error) {
      toast.error("댓글 삭제 중 오류가 발생했습니다.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleDelete}
      disabled={isLoading}
      aria-label="댓글 삭제"
    >
      <TrashIcon className="text-destructive" />
    </Button>
  );
}
