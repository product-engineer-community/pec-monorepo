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
  PostType,
} from "@packages/ui";
import { Trash2 } from "lucide-react";
import { useActionState, useState } from "react";

import { deletePost } from "../action";

type DeletePostButtonProps = {
  postType: PostType;
  postId: string;
};

export function DeletePostButton({ postType, postId }: DeletePostButtonProps) {
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(
    async () => await deletePost(postId, postType),
    {
      error: "",
    },
  );

  // 타입에 따른 제목 및 설명 텍스트 설정
  const getTitle = () => {
    switch (postType) {
      case "question":
        return "질문 삭제";
      case "discussion":
        return "토론 삭제";
      default:
        return "게시글 삭제";
    }
  };

  const getDescription = () => {
    let postTypeText = "";
    switch (postType) {
      case "question":
        postTypeText = "질문";
        break;
      case "discussion":
        postTypeText = "토론";
        break;
      default:
        postTypeText = "게시글";
    }

    return `정말로 이 ${postTypeText}을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
          <DialogDescription>{getDescription()}</DialogDescription>
        </DialogHeader>

        {state?.error && (
          <div className="text-sm text-red-500">{state.error}</div>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isPending}>
              취소
            </Button>
          </DialogClose>
          <form action={formAction}>
            <Button
              variant="destructive"
              type="submit"
              disabled={isPending}
              isLoading={isPending}
            >
              삭제하기
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
