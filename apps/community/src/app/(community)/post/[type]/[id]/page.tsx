import {
  getPostTypeDisplayName,
  getPostTypePathname,
} from "@packages/constants";
import { PostType, postType as postTypeSchema } from "@packages/ui";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { getPost, incrementViewCount } from "@/entities/post/action";
import {
  DeletePostButton,
  EditPostButton,
  PostLikeButton,
} from "@/features/post";
import { Comments } from "@/widgets/comments";
import { CommentsSkeleton } from "@/widgets/comments/ui/CommentsSkeleton";
import { PostDetail } from "@/widgets/post";

interface PostPageProps {
  params: Promise<{
    type: Exclude<PostType, "article">;
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { type, id } = await params;
  const post = await getPost(id);

  const postTypeDisplayName = getPostTypeDisplayName(type);

  if (!post) {
    return {
      title: `${postTypeDisplayName} 게시물을 찾을 수 없습니다`,
      description: `요청하신 ${postTypeDisplayName} 게시물을 찾을 수 없습니다.`,
    };
  }

  const postTypePath = getPostTypePathname(type);

  return {
    title: post.title || `${postTypeDisplayName} 게시물`,
    description:
      post.content?.substring(0, 160) ||
      `${postTypeDisplayName} 게시물 상세 내용입니다.`,
    openGraph: {
      title: post.title || `${postTypeDisplayName} 게시물`,
      description:
        post.content?.substring(0, 160) ||
        `${postTypeDisplayName} 게시물 상세 내용입니다.`,
      type: "article",
      url: `${process.env.NEXT_PUBLIC_APP_URL}/${postTypePath}/${id}`,
      images: [post.thumbnail_url || "/logo.webp"],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { type: postType, id } = await params;

  if (!(postType in postTypeSchema.Enum)) {
    notFound();
  }

  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  // 조회수 증가
  await incrementViewCount(id);

  return (
    <div className="mx-auto lg:container lg:py-8">
      <div className="overflow-hidden rounded-lg bg-white p-6 shadow-md">
        <Suspense
          fallback={
            <div className="h-[500px] w-full animate-pulse rounded-lg bg-gray-200" />
          }
        >
          <PostDetail
            id={id}
            deleteButton={<DeletePostButton postType={postType} postId={id} />}
            postLikeButton={
              <PostLikeButton
                postId={id}
                initialLikes={post.likes_count || 0}
                initialIsLiked={post.is_liked || false}
              />
            }
            editButton={<EditPostButton postId={id} />}
          />
        </Suspense>
      </div>

      <div className="border-t pt-8">
        <Suspense fallback={<CommentsSkeleton />}>
          <Comments postType={postType} postId={id} />
        </Suspense>
      </div>
    </div>
  );
}
