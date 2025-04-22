"use client";

import { Button, Input } from "@pec/shared";
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";

import { addComment } from "../action";

interface CommentFormProps {
  postId: string;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      댓글 작성
    </Button>
  );
}

const initialState = {
  error: null,
  success: false,
  comment: null,
};

export function CommentForm({ postId }: CommentFormProps) {
  const [content, setContent] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [state, formAction] = useActionState<any, FormData>(
    addComment,
    initialState,
  );

  const handleReset = () => {
    if (state.success) {
      setContent("");
    }
  };

  return (
    <form action={formAction} onSubmit={handleReset} className="flex gap-2">
      <input type="hidden" name="postId" value={postId} />
      <Input
        name="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="댓글을 입력하세요"
        required
      />
      <SubmitButton />

      {state.error && (
        <div className="mt-1 text-sm text-red-500">{state.error}</div>
      )}
    </form>
  );
}
