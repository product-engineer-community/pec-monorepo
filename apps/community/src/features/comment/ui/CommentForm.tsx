"use client";

import { Button } from "@pec/ui";
import { useState } from "react";
import { toast } from "sonner";

import { convertPointTypeToToastMessage } from "@/entities/point/model";
import { getUserEmail } from "@/features/auth/action";
import { createComment } from "@/features/comment/action";
import { getPostType } from "@/features/post/action";
import { getUsername } from "@/features/user/action";
import { sendEmail } from "@/shared/api";
import { MAIL_TEMPLATE } from "@/shared/api/consts";
import { Editor } from "@/shared/components/editor";

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
          title: "작성하신 게시글에 댓글이 달렸어요!",
          recipientEmail: email,
          recipientName: username,
          templateId: MAIL_TEMPLATE.COMMENT,
          data: {
            link: `https://www.productengineer.info/community/${type}s/${postId}`,
          },
        }).catch();
      }

      if (onCancel) onCancel();
      toast.success(convertPointTypeToToastMessage("comment"));
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
