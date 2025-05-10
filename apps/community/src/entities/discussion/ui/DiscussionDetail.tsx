import { getAuthSession } from "@packages/supabase";
import { getRelativeTimeString } from "@packages/ui";
import { notFound } from "next/navigation";

import { getPost } from "@/entities/post";
import { MarkdownViewer } from "@/shared/components/editor";

interface DiscussionDetailProps {
  id: string;
  deleteButton?: React.ReactNode;
  postLikeButton?: React.ReactNode;
  editButton?: React.ReactNode;
}

export async function DiscussionDetail({
  id,
  deleteButton,
  postLikeButton,
  editButton,
}: DiscussionDetailProps) {
  // 토론 데이터 가져오기
  const discussion = await getPost(id);

  // 토론이 존재하지 않는 경우
  if (!discussion) {
    notFound();
  }

  // 현재 사용자 세션 가져오기
  const session = await getAuthSession();

  // 사용자가 토론 작성자인지 확인
  const isAuthor = session?.user?.id === discussion.author.id;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
            {discussion.author.username?.[0]?.toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">
              {discussion.author.username}
            </span>
            <span className="text-xs text-gray-500">
              {getRelativeTimeString(discussion.created_at)}
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
        <h1 className="mb-4 text-2xl font-bold">{discussion.title}</h1>
        <MarkdownViewer content={discussion.content} />
      </div>
    </div>
  );
}
