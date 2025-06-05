"use client";

import { getUserEmail } from "@packages/auth/src/features";
import { convertPointTypeToToastMessage } from "@packages/point/src/entities";
import { Button, PostType } from "@packages/ui";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { createComment } from "@/features/comment";
import { getPostType } from "@/features/post/action";
import { getUsername } from "@/features/user/action";
import { CommentNotificationEmailTemplate, sendEmail } from "@/shared/api";
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
  const params = useParams<{ type: PostType; id: string }>();
  const postType = params.type as PostType;
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast.error("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      setIsLoading(true);
      await createComment(postId, content, parentId, postType);
      setContent("");

      const { authorId, type } = await getPostType(postId);
      const [{ email }, { username }] = await Promise.all([
        getUserEmail(authorId),
        getUsername(authorId),
      ]);

      if (email) {
        sendEmail({
          title: "작성하신 게시글에 댓글이 달렸어요!",
          recipientEmail: email,
          template: CommentNotificationEmailTemplate({
            name: username,
            type,
            postId,
          }),
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
