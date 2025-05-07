"use client";

import { Button } from "@packages/ui";
import { ReplyIcon } from "lucide-react";

interface CommentReplyButtonProps {
  commentId: string;
  onReply: (commentId: string) => void;
}

export function CommentReplyButton({
  commentId,
  onReply,
}: CommentReplyButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => onReply(commentId)}
      aria-label="답글 작성"
    >
      <ReplyIcon />
    </Button>
  );
}
