import { getIsAuthenticated } from "@packages/auth/src/features";
import { COMMUNITY_PRODUCTIVITY_PATHNAME, COMMUNITY_PATHNAME } from "@packages/constants";
import { PostType, postType as postTypeSchema } from "@packages/ui"; // Import postTypeSchema
import type { Metadata } from "next";
import { notFound } from "next/navigation"; // Import notFound
import { Suspense } from "react";

import { getPost, incrementViewCount } from "@/entities/post/action";
import { PostDetail } from "@/widgets/post"; // Import generic PostDetail
import {
  DeletePostButton,
  EditPostButton,
  PostLikeButton,
} from "@/features/post";
import { Comments } from "@/widgets/comments";
import { CommentsSkeleton } from "@/widgets/comments/ui/CommentsSkeleton";

interface ProductivityPostPageProps { // Renamed interface
  params: {
    id: string;
  };
}

// Removed local placeholders for ProductivityDetail and ProductivityDetailSkeleton

export async function generateMetadata({
  params,
}: ProductivityPostPageProps): Promise<Metadata> {
  const { id } = params;
  const post = await getPost(id);

  if (!post) {
    return {
      title: "Productivity 게시물을 찾을 수 없습니다",
      description: "요청하신 Productivity 게시물을 찾을 수 없습니다.",
    };
  }

  return {
    title: post.title || "Productivity 게시물",
    description:
      post.content?.substring(0, 160) || "Productivity 게시물 상세 내용입니다.",
    openGraph: {
      title: post.title || "Productivity 게시물",
      description:
        post.content?.substring(0, 160) || "Productivity 게시물 상세 내용입니다.",
      type: "article",
      url: `${process.env.NEXT_PUBLIC_APP_URL}${COMMUNITY_PATHNAME}${COMMUNITY_PRODUCTIVITY_PATHNAME}/${id}`, // Updated path
      images: [post.thumbnail_url || "/logo.webp"],
    },
  };
}

export default async function ProductivityPostPage({ params }: ProductivityPostPageProps) { // Renamed function and used interface
  const { id } = params; // params is not a Promise

  const [post, isAuthenticated] = await Promise.all([ // Renamed variable
    getPost(id),
    getIsAuthenticated(),
  ]);

  if (!post) { // Check if post is null
    notFound(); // Use notFound if post doesn't exist
  }

  // 조회수 증가
  await incrementViewCount(id);

  return (
    <div className="mx-auto lg:container lg:py-8">
      <div className="overflow-hidden rounded-lg bg-white p-6 shadow-md">
        <Suspense
          fallback={<div className="h-[500px] w-full animate-pulse rounded-lg bg-gray-200" />}
        >
          <PostDetail // Using generic PostDetail
            id={id}
            // getPost in PostDetail will fetch the data.
            // The interactive buttons are passed as children/props
            deleteButton={
              <DeletePostButton postType={postTypeSchema.Enum.productivity} postId={id} />
            }
            postLikeButton={
              <PostLikeButton
                postId={id}
                initialLikes={post.likes_count || 0}
                initialIsLiked={post.is_liked || false}
                isAuthenticated={isAuthenticated}
              />
            }
            editButton={<EditPostButton postId={id} />}
          />
        </Suspense>
      </div>

      <div className="border-t pt-8">
        <Suspense fallback={<CommentsSkeleton />}>
          <Comments postType={postTypeSchema.Enum.productivity} postId={id} /> {/* Updated postType */}
        </Suspense>
      </div>
    </div>
  );
}
