"use client";

import { Button } from "@pec/shared";
import { useState } from "react";
import { toast } from "sonner";

import { Editor } from "@/shared/components/editor";
import { convertPointTypeToToastMessage } from "@/src/entities/point/model";

import { createComment } from "../action";

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
    <div className="rounded-lg border p-4">
      <Editor content={content} onChange={setContent} />
      <div className="mt-4 flex items-center justify-between">
        {parentId && onCancel && (
          <Button variant="ghost" onClick={onCancel}>
            답글 취소
          </Button>
        )}
        <Button className="ml-auto" onClick={handleSubmit} disabled={isLoading}>
          {parentId ? "답글 작성" : "댓글 작성"}
        </Button>
      </div>
    </div>
  );
}
