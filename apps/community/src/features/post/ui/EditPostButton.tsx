"use client";

import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@pec/shared";
import { Pencil } from "lucide-react";
import Link from "next/link";

interface EditPostButtonProps {
  postId: string;
}

export function EditPostButton({ postId }: EditPostButtonProps) {
  return (
    <Link href={`/community/post/edit/${postId}`}>
      {/* hover popup 수정하기 텍스트 */}
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm">
              <Pencil className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>수정하기</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Link>
  );
}
