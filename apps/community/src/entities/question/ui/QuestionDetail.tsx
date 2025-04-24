import { getRelativeTimeString } from "@pec/shared";

import { DeletePostButton, PostLikeButton } from "@/features/post";
import { MarkdownViewer } from "@/shared/components/editor";
import { getUserFromSupabase } from "@/shared/supabase";

import { getQuestion } from "../action";

interface QuestionDetailProps {
  id: string;
  onDelete: () => Promise<{ success?: boolean; error?: string }>;
}

export async function QuestionDetail({ id, onDelete }: QuestionDetailProps) {
  // 질문 데이터 가져오기
  const question = await getQuestion(id);

  // 질문이 존재하지 않는 경우
  if (!question) {
    return <div>Question not found</div>;
  }

  const user = await getUserFromSupabase();

  const isAuthor = user?.id === question.author.id;

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
            <DeletePostButton postType="question" deletePost={onDelete} />
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
