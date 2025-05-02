import { Suspense } from "react";

import { incrementViewCount } from "@/src/entities/post";
import {
  DiscussionDetail,
  DiscussionDetailSkeleton,
} from "@/entities/discussion";
import { Comments, CommentsSkeleton } from "@/widgets/comments";

export default async function DiscussionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 조회수 증가
  incrementViewCount(id);

  return (
    <div className="mx-auto max-w-4xl space-y-8 py-8">
      <Suspense fallback={<DiscussionDetailSkeleton />}>
        <DiscussionDetail id={id} />
      </Suspense>

      <div className="border-t pt-8">
        <Suspense fallback={<CommentsSkeleton />}>
          <Comments postId={id} />
        </Suspense>
      </div>
    </div>
  );
}
