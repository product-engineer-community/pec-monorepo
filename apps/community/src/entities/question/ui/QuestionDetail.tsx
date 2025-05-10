import { getAuthSession } from "@packages/supabase";
import { getRelativeTimeString } from "@packages/ui";
import { notFound } from "next/navigation";

import { MarkdownViewer } from "@/shared/components/editor";
import { getPost } from "@/src/entities/post";

interface QuestionDetailProps {
  id: string;
  deleteButton?: React.ReactNode;
  postLikeButton?: React.ReactNode;
  editButton?: React.ReactNode;
}

export async function QuestionDetail({
  id,
  deleteButton,
  postLikeButton,
  editButton,
}: QuestionDetailProps) {
  // 질문 데이터 가져오기
  const question = await getPost(id);

  // 질문이 존재하지 않는 경우
  if (!question) {
    notFound();
  }

  const session = await getAuthSession();

  const isAuthor = session?.user?.id === question.author.id;

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
          {isAuthor && editButton}
          {isAuthor && deleteButton}
          {postLikeButton}
        </div>
      </div>
      <div>
        <h1 className="mb-4 text-2xl font-bold">{question.title}</h1>
        <MarkdownViewer content={question.content} />
      </div>
    </div>
  );
}
