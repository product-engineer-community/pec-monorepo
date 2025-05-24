import { getIsAuthenticated } from "@packages/auth/src/features";
import { COMMUNITY_PATHNAME } from "@packages/constants";
import type { Metadata } from "next";
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const discussion = await getPost(id);

  if (!discussion) {
    return {
      title: "디스커션을 찾을 수 없습니다",
      description: "요청하신 디스커션을 찾을 수 없습니다.",
    };
  }

  return {
    title: discussion.title || "디스커션",
    description:
      discussion.content?.substring(0, 160) || "디스커션 상세 내용입니다.",
    openGraph: {
      title: discussion.title || "디스커션",
      description:
        discussion.content?.substring(0, 160) || "디스커션 상세 내용입니다.",
      type: "article",
      url: `${process.env.NEXT_PUBLIC_APP_URL}/${COMMUNITY_PATHNAME}/discussions/${id}`,
      images: [discussion.thumbnail_url || "/logo.webp"],
    },
  };
}

export default async function DiscussionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [discussion, isAuthenticated] = await Promise.all([
    getPost(id),
    getIsAuthenticated(),
  ]);

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
              isAuthenticated={isAuthenticated}
            />
          }
          editButton={<EditPostButton postId={id} />}
        />
      </Suspense>

      <div className="border-t pt-8">
        <Suspense fallback={<CommentsSkeleton />}>
          <Comments postType="discussion" postId={id} />
        </Suspense>
      </div>
    </div>
  );
}
