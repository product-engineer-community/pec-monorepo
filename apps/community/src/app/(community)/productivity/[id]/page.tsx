import { getIsAuthenticated } from "@packages/auth/src/features";
import { COMMUNITY_PRODUCTIVITY_PATHNAME, COMMUNITY_PATHNAME } from "@packages/constants";
import { PostType, postType as postTypeSchema } from "@packages/ui"; // Import postTypeSchema
import type { Metadata } from "next";
import { notFound } from "next/navigation"; // Import notFound
import { Suspense } from "react";

import { getPost, incrementViewCount } from "@/entities/post/action";
// TODO: Replace with actual ProductivityDetail components or generic PostDetail components
// import { ProductivityDetail, ProductivityDetailSkeleton } from "@/entities/productivity";
import {
  DeletePostButton,
  EditPostButton,
  PostLikeButton,
} from "@/features/post";
import { Comments } from "@/widgets/comments";
import { CommentsSkeleton } from "@/widgets/comments/ui/CommentsSkeleton";

interface ProductivityPostPageProps { // Renamed interface
  params: { // params is not a Promise here, Next.js resolves it
    id: string;
  };
}

// Placeholder for missing components
const ProductivityDetailSkeleton = () => <div>Loading productivity post details...</div>;
const ProductivityDetail = ({ id, deleteButton, postLikeButton, editButton, postData }: any) => (
  <div>
    <h1>Post Title: {postData.title}</h1>
    <p>Content: {postData.content}</p>
    {/* Render actual post data here */}
    <div>{editButton} {deleteButton}</div>
    <div>{postLikeButton}</div>
  </div>
);

export async function generateMetadata({
  params,
}: ProductivityPostPageProps): Promise<Metadata> { // Used renamed interface
  const { id } = params; // params is not a Promise
  const post = await getPost(id); // Renamed variable

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
          fallback={<ProductivityDetailSkeleton />} // Using placeholder
        >
          <ProductivityDetail // Using placeholder
            id={id}
            postData={post} // Pass post data to placeholder
            deleteButton={
              <DeletePostButton postType={postTypeSchema.Enum.productivity} postId={id} /> // Updated postType
            }
            postLikeButton={
              <PostLikeButton
                postId={id}
                initialLikes={post.likes_count || 0} // Use post variable
                initialIsLiked={post.is_liked || false} // Use post variable
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
