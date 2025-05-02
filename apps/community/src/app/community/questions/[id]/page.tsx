import { notFound } from "next/navigation";
import { Suspense } from "react";

import { QuestionDetail, QuestionDetailSkeleton } from "@/entities/question";
import { getPost, incrementViewCount } from "@/src/entities/post";
import { DeletePostButton, PostLikeButton } from "@/src/features/post";
import { Comments, CommentsSkeleton } from "@/src/widgets/comments";

export default async function QuestionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const question = await getPost(id);

  if (!question) {
    notFound();
  }

  // 조회수 증가
  incrementViewCount(id);

  return (
    <div className="mx-auto max-w-4xl space-y-8 py-8">
      <Suspense fallback={<QuestionDetailSkeleton />}>
        <QuestionDetail
          id={id}
          deleteButton={<DeletePostButton postType="question" postId={id} />}
          postLikeButton={
            <PostLikeButton
              postId={id}
              initialLikes={question.likes_count}
              initialIsLiked={question.is_liked}
            />
          }
        />
      </Suspense>

      <div className="border-t pt-8">
        <Suspense fallback={<CommentsSkeleton />}>
          <Comments postId={id} />
        </Suspense>
      </div>
    </div>
  );
}
