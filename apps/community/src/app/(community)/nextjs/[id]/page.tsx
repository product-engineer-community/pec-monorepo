import { getIsAuthenticated } from "@packages/auth/src/features";
import {
  COMMUNITY_NEXTJS_PATHNAME,
  COMMUNITY_PATHNAME,
} from "@packages/constants";
import { postType as postTypeSchema } from "@packages/ui";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { getPost, incrementViewCount } from "@/entities/post";
import {
  DeletePostButton,
  EditPostButton,
  PostLikeButton,
} from "@/features/post";
import { Comments, CommentsSkeleton } from "@/widgets/comments";
import { PostDetail } from "@/widgets/post";

interface NextjsPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: NextjsPostPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    return {
      title: "Next.js 게시물을 찾을 수 없습니다",
      description: "요청하신 Next.js 게시물을 찾을 수 없습니다.",
    };
  }

  return {
    title: post.title || "Next.js 게시물",
    description:
      post.content?.substring(0, 160) || "Next.js 게시물 상세 내용입니다.",
    openGraph: {
      title: post.title || "Next.js 게시물",
      description:
        post.content?.substring(0, 160) || "Next.js 게시물 상세 내용입니다.",
      type: "article",
      url: `${process.env.NEXT_PUBLIC_APP_URL}${COMMUNITY_PATHNAME}${COMMUNITY_NEXTJS_PATHNAME}/${id}`,
      images: [post.thumbnail_url || "/logo.webp"],
    },
  };
}

export default async function NextjsPostPage({ params }: NextjsPostPageProps) {
  const { id } = await params;
  const [post, isAuthenticated] = await Promise.all([
    getPost(id),
    getIsAuthenticated(),
  ]);

  if (!post) {
    notFound();
  }

  // 조회수 증가
  incrementViewCount(id); // No await needed if it's fire-and-forget

  return (
    <div className="mx-auto max-w-4xl space-y-8 py-8">
      <Suspense
        fallback={
          <div className="h-[500px] w-full animate-pulse rounded-lg bg-gray-200" />
        }
      >
        <PostDetail // Using generic PostDetail
          id={id}
          deleteButton={
            <DeletePostButton
              postType={postTypeSchema.Enum.nextjs}
              postId={id}
            />
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
          <Comments postType={postTypeSchema.Enum.nextjs} postId={id} />
        </Suspense>
      </div>
    </div>
  );
}
