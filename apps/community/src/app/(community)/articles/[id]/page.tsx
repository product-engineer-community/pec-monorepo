import { getIsAuthenticated } from "@packages/auth/src/features";
import { COMMUNITY_PATHNAME } from "@packages/constants";
import { postType } from "@packages/ui/src/types/schema";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { ArticleDetail } from "@/entities/articles";
import { getPost, incrementViewCount } from "@/entities/post/action";
import {
  DeletePostButton,
  EditPostButton,
  PostLikeButton,
} from "@/features/post";
import { Comments } from "@/src/widgets/comments";
import { CommentsSkeleton } from "@/src/widgets/comments/ui/CommentsSkeleton";

interface ArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { id } = await params;
  const article = await getPost(id);

  if (!article) {
    return {
      title: "아티클을 찾을 수 없습니다",
      description: "요청하신 아티클을 찾을 수 없습니다.",
    };
  }

  return {
    title: article.title || "아티클",
    description:
      article.content?.substring(0, 160) || "아티클 상세 내용입니다.",
    openGraph: {
      title: article.title || "아티클",
      description:
        article.content?.substring(0, 160) || "아티클 상세 내용입니다.",
      type: "article",
      url: `${process.env.NEXT_PUBLIC_APP_URL}/${COMMUNITY_PATHNAME}/articles/${id}`,
      images: [article.thumbnail_url || "/default-article-thumbnail.svg"],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;

  // 조회수 증가
  await incrementViewCount(id);

  const [article, isAuthenticated] = await Promise.all([
    getPost(id),
    getIsAuthenticated(),
  ]);

  if (!article) {
    return notFound();
  }

  return (
    <div className="mx-auto lg:container lg:py-8">
      <div className="overflow-hidden rounded-lg bg-white p-6 shadow-md">
        <Suspense
          fallback={
            <div className="h-[500px] w-full animate-pulse rounded-lg bg-gray-200" />
          }
        >
          <ArticleDetail
            id={id}
            deleteButton={
              <DeletePostButton postType={postType.Enum.article} postId={id} />
            }
            postLikeButton={
              <PostLikeButton
                postId={id}
                initialLikes={article.likes_count}
                initialIsLiked={article.is_liked}
                isAuthenticated={isAuthenticated}
              />
            }
            editButton={<EditPostButton postId={id} />}
          />
        </Suspense>
      </div>

      <div className="border-t pt-8">
        <Suspense fallback={<CommentsSkeleton />}>
          <Comments postType={postType.Enum.article} postId={id} />
        </Suspense>
      </div>
    </div>
  );
}
