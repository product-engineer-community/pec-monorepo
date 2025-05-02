import { getRelativeTimeString } from "@pec/shared";
import { notFound, redirect } from "next/navigation";

import { DeletePostButton, PostLikeButton } from "@/features/post";
import { MarkdownViewer } from "@/shared/components/editor";
import { getAuthSession } from "@/shared/supabase";
import { getPost } from "@/src/entities/post";
import { deleteQuestion } from "@/src/features/question/action";

interface QuestionDetailProps {
  id: string;
}

export async function QuestionDetail({ id }: QuestionDetailProps) {
  // 질문 데이터 가져오기
  const question = await getPost(id);

  // 질문이 존재하지 않는 경우
  if (!question) {
    notFound();
  }

  const session = await getAuthSession();

  const isAuthor = session?.user?.id === question.author.id;

  async function handleDeleteQuestion() {
    "use server";
    const result = await deleteQuestion(id);

    if (result.success) {
      redirect("/community/questions");
    }

    return result;
  }

  return (
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
  );
}
