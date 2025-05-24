import { getIsAuthenticated } from "@packages/auth/src/features";
import type { Metadata } from "next";
import { Suspense } from "react";

import { getPost, incrementViewCount } from "@/entities/post/action";
import { QuestionDetail } from "@/entities/question";
import {
  DeletePostButton,
  EditPostButton,
  PostLikeButton,
} from "@/features/post";
import { Comments } from "@/widgets/comments";
import { CommentsSkeleton } from "@/widgets/comments/ui/CommentsSkeleton";

interface QuestionPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = params;
  const question = await getPost(id);

  if (!question) {
    return {
      title: "퀘스천을 찾을 수 없습니다",
      description: "요청하신 퀘스천을 찾을 수 없습니다.",
    };
  }

  return {
    title: question.title || "퀘스천",
    description:
      question.content?.substring(0, 160) || "퀘스천 상세 내용입니다.",
    openGraph: {
      title: question.title || "퀘스천",
      description:
        question.content?.substring(0, 160) || "퀘스천 상세 내용입니다.",
      type: "article",
      url: `/questions/${id}`,
      images: [question.thumbnail_url || "/logo.webp"],
    },
  };
}

export default async function QuestionPage({ params }: QuestionPageProps) {
  const { id } = await params;

  const [question, isAuthenticated] = await Promise.all([
    getPost(id),
    getIsAuthenticated(),
  ]);

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
          <QuestionDetail
            id={id}
            deleteButton={<DeletePostButton postType="question" postId={id} />}
            postLikeButton={
              <PostLikeButton
                postId={id}
                initialLikes={question?.likes_count || 0}
                initialIsLiked={question?.is_liked || false}
                isAuthenticated={isAuthenticated}
              />
            }
            editButton={<EditPostButton postId={id} />}
          />
        </Suspense>
      </div>

      <div className="border-t pt-8">
        <Suspense fallback={<CommentsSkeleton />}>
          <Comments postId={id} />
        </Suspense>
      </div>
    </div>
  );
}
