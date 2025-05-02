"use client";

import { Button } from "@pec/shared";
import { useState } from "react";
import { toast } from "sonner";

import { Editor } from "@/shared/components/editor";

import { createComment } from "../action";
import { sendEmail } from "@/shared/api";
import { getUserEmail } from "../../auth/action";
import { getPostType } from "../../post/action";
import { getUsername } from "../../user/action";

interface CommentFormProps {
  postId: string;
  parentId?: string | null;
  onCancel?: () => void;
}

export function CommentForm({
  postId,
  parentId = null,
  onCancel,
}: CommentFormProps) {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast.error("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      setIsLoading(true);
      await createComment(postId, content, parentId);
      setContent("");

      const { authorId, type } = await getPostType(postId);
      const { email } = await getUserEmail(authorId);
      const { username } = await getUsername(authorId);
      if (email) {
        sendEmail({
          recipientEmail: email,
          recipientName: username,
          link: `https://www.productengineer.info/community/${type}s/${postId}`,
        }).catch();
      }

      if (onCancel) onCancel();
      toast.success(
        parentId ? "답글이 작성되었습니다." : "댓글이 작성되었습니다.",
      );
    } catch (error) {
      toast.error("댓글 작성 중 오류가 발생했습니다.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 rounded-lg border p-4">
      <Editor content={content} onChange={setContent} />
      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button variant="outline" onClick={onCancel} disabled={isLoading}>
            취소
          </Button>
        )}
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {parentId ? "답글 작성" : "댓글 작성"}
        </Button>
      </div>
    </div>
  );
}
