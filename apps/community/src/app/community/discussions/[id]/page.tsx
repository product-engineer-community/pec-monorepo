import { notFound } from "next/navigation";
import { Suspense } from "react";

import {
  DiscussionDetail,
  DiscussionDetailSkeleton,
} from "@/entities/discussion";
import { getPost, incrementViewCount } from "@/entities/post";
import {
  DeletePostButton,
  EditPostButton,
  PostLikeButton,
} from "@/features/post";
import { Comments, CommentsSkeleton } from "@/widgets/comments";

export default async function DiscussionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const discussion = await getPost(id);

  if (!discussion) {
    notFound();
  }

  // 조회수 증가
  incrementViewCount(id);

  return (
    <div className="mx-auto max-w-4xl space-y-8 py-8">
      <Suspense fallback={<DiscussionDetailSkeleton />}>
        <DiscussionDetail
          id={id}
          deleteButton={<DeletePostButton postType="discussion" postId={id} />}
          postLikeButton={
            <PostLikeButton
              postId={id}
              initialLikes={discussion.likes_count}
              initialIsLiked={discussion.is_liked}
            />
          }
          editButton={<EditPostButton postId={id} />}
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
