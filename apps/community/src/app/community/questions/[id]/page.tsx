import { Suspense } from "react";

import { incrementViewCount } from "@/src/entities/post";
import { QuestionDetail, QuestionDetailSkeleton } from "@/entities/question";
import { Comments, CommentsSkeleton } from "@/widgets/comments";

export default async function QuestionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 조회수 증가
  incrementViewCount(id);

  return (
    <div className="mx-auto max-w-4xl space-y-8 py-8">
      <Suspense fallback={<QuestionDetailSkeleton />}>
        <QuestionDetail id={id} />
      </Suspense>

      <div className="border-t pt-8">
        <Suspense fallback={<CommentsSkeleton />}>
          <Comments postId={id} />
        </Suspense>
      </div>
    </div>
  );
}
