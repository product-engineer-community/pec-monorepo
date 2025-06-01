import { getIsAuthenticated } from "@packages/auth/src/features";
import {
  COMMUNITY_FSD_PATHNAME,
  COMMUNITY_PATHNAME,
} from "@packages/constants";
import { PostType } from "@packages/ui";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

// TODO: Replace with actual F.S.D components when available
// import {
//   FSDDetail,
//   FSDDetailSkeleton,
// } from "@/entities/fsd";
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
  const post = await getPost(id); // Renamed variable for clarity

  if (!post) {
    return {
      title: "F.S.D 게시물을 찾을 수 없습니다",
      description: "요청하신 F.S.D 게시물을 찾을 수 없습니다.",
    };
  }

  return {
    title: post.title || "F.S.D 게시물",
    description:
      post.content?.substring(0, 160) || "F.S.D 게시물 상세 내용입니다.",
    openGraph: {
      title: post.title || "F.S.D 게시물",
      description:
        post.content?.substring(0, 160) || "F.S.D 게시물 상세 내용입니다.",
      type: "article",
      url: `${process.env.NEXT_PUBLIC_APP_URL}${COMMUNITY_PATHNAME}${COMMUNITY_FSD_PATHNAME}/${id}`, // Updated path
      images: [post.thumbnail_url || "/logo.webp"],
    },
  };
}

export default async function FSDDetailPage({
  // Renamed function
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [post, isAuthenticated] = await Promise.all([
    // Renamed variable
    getPost(id),
    getIsAuthenticated(),
  ]);

  if (!post) {
    notFound();
  }

  // 조회수 증가
  incrementViewCount(id);

  return (
    <div className="mx-auto max-w-4xl space-y-8 py-8">
      <Suspense fallback={<FSDDetailSkeleton />}>
        <FSDDetail // Using placeholder
          id={id}
          postData={post} // Pass post data to placeholder
          deleteButton={
            <DeletePostButton postType={"fsd" as PostType} postId={id} /> // Updated postType
          }
          postLikeButton={
            <PostLikeButton
              postId={id}
              initialLikes={post.likes_count}
              initialIsLiked={post.is_liked}
              isAuthenticated={isAuthenticated}
            />
          }
          editButton={<EditPostButton postId={id} />}
        />
      </Suspense>

      <div className="border-t pt-8">
        <Suspense fallback={<CommentsSkeleton />}>
          <Comments postType={"fsd" as PostType} postId={id} /> // Updated
          postType
        </Suspense>
      </div>
    </div>
  );
}
