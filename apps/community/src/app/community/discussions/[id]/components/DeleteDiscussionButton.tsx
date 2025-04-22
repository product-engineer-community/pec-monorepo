"use client";

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@pec/shared";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useFormState } from "react-dom";

type DeleteDiscussionButtonProps = {
  deleteDiscussion: () => Promise<{ success?: boolean; error?: string }>;
};

export function DeleteDiscussionButton({
  deleteDiscussion,
}: DeleteDiscussionButtonProps) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [state, formAction] = useFormState(deleteDiscussion, {
    success: false,
  });

  const handleDelete = async () => {
    setIsDeleting(true);
    await formAction();
    setIsDeleting(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          삭제
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>토론 삭제</DialogTitle>
          <DialogDescription>
            정말로 이 토론을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
          </DialogDescription>
        </DialogHeader>

        {state.error && (
          <div className="text-sm text-red-500">{state.error}</div>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isDeleting}>
              취소
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                삭제 중...
              </>
            ) : (
              "삭제"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
