import { getRelativeTimeString } from "@pec/shared";
import { redirect } from "next/navigation";

import { DeletePostButton, PostLikeButton } from "@/features/post";
import {
  deleteQuestion,
  getQuestion,
  incrementViewCount,
} from "@/features/question/action";
import { MarkdownViewer } from "@/shared/components/editor";
import { getAuthSession } from "@/shared/supabase";
import { Comments } from "@/widgets/comments";

export default async function QuestionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 질문 데이터 가져오기
  const question = await getQuestion(id);
  console.log("🚀 ~ question:", question);

  // 현재 사용자 세션 가져오기
  const session = await getAuthSession();
  const currentUserId = session?.user?.id;
  console.log("🚀 ~ currentUserId:", currentUserId);

  // 조회수 증가
  await incrementViewCount(id);

  if (!question) {
    return <div>Question not found</div>;
  }

  // 삭제 기능 정의
  async function handleDeleteQuestion() {
    "use server";

    const result = await deleteQuestion(id);

    if (result.success) {
      redirect("/community/questions");
    }

    return result;
  }

  // 사용자가 질문 작성자인지 확인
  const isAuthor = currentUserId === question.author.id;

  return (
    <div className="mx-auto max-w-4xl space-y-8 py-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
              {question.author.username?.[0]?.toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">
                {question.author.username}
              </span>
              <span className="text-xs text-gray-500">
                {getRelativeTimeString(question.created_at)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isAuthor && (
              <DeletePostButton
                postType="question"
                deletePost={handleDeleteQuestion}
              />
            )}
            <PostLikeButton
              postId={id}
              initialLikes={question.likes_count}
              initialIsLiked={question.is_liked}
              size="sm"
            />
          </div>
        </div>
        <div>
          <h1 className="mb-4 text-2xl font-bold">{question.title}</h1>
          <MarkdownViewer content={question.content} />
        </div>
      </div>

      <div className="border-t pt-8">
        <Comments postId={id} />
      </div>
    </div>
  );
}
