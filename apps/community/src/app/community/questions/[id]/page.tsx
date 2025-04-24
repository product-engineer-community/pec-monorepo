import { redirect } from "next/navigation";
import { Suspense } from "react";

import {
  incrementViewCount,
  QuestionDetail,
  QuestionDetailSkeleton,
} from "@/entities/question";
import { deleteQuestion } from "@/features/question/action";
import { Comments, CommentsSkeleton } from "@/widgets/comments";

export default async function QuestionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 현재 사용자 세션 가져오기

  // 조회수 증가
  await incrementViewCount(id);

  async function handleDeleteQuestion() {
    "use server";
    const result = await deleteQuestion(id);

    if (result.success) {
      redirect("/community/questions");
    }

    return result;
  }

  // 사용자가 질문 작성자인지 확인

  return (
    <div className="mx-auto max-w-4xl space-y-8 py-8">
      <Suspense fallback={<QuestionDetailSkeleton />}>
        <QuestionDetail id={id} onDelete={handleDeleteQuestion} />
      </Suspense>

      <div className="border-t pt-8">
        <Suspense fallback={<CommentsSkeleton />}>
          <Comments postId={id} />
        </Suspense>
      </div>
    </div>
  );
}
