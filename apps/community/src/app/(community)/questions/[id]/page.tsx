import { getAuthSession } from "@packages/supabase";
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

export default async function QuestionPage({ params }: QuestionPageProps) {
  const { id } = await params;

  const [question, session] = await Promise.all([
    getPost(id),
    getAuthSession(),
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
                isAuthenticated={Boolean(session?.user)}
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
