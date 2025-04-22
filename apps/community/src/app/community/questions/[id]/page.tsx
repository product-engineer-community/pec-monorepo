import { getRelativeTimeString } from "@pec/shared";

import { PostLikeButton } from "@/features/post";
import { getQuestion, incrementViewCount } from "@/features/question/action";
import { MarkdownViewer } from "@/shared/components/editor";
import { Comments } from "@/widgets/comments";

export default async function QuestionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 질문 데이터 가져오기
  const question = await getQuestion(id);

  // 조회수 증가
  await incrementViewCount(id);

  if (!question) {
    return <div>Question not found</div>;
  }

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
          <PostLikeButton
            postId={id}
            initialLikes={question.likes_count}
            initialIsLiked={question.is_liked}
            size="sm"
          />
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
