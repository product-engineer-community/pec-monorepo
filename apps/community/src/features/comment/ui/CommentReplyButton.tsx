"use client";

import { Button, cn } from "@packages/ui";
import { ReplyIcon } from "lucide-react";

interface CommentReplyButtonProps {
  commentId: string;
  disabled?: boolean;
  onReply: (commentId: string) => void;
}

export function CommentReplyButton({
  commentId,
  disabled = false,
  onReply,
}: CommentReplyButtonProps) {
  return (
    <Button
      className={cn(disabled && "cursor-not-allowed text-gray-400")}
      variant="ghost"
      size="icon"
      onClick={() => onReply(commentId)}
      aria-label="답글 작성"
      disabled={disabled}
    >
      <ReplyIcon />
    </Button>
  );
}
