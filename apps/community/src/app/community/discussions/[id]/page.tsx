import { getRelativeTimeString } from "@pec/shared";

import {
  getDiscussion,
  incrementViewCount,
} from "@/features/discussion/action";
import { PostLikeButton } from "@/features/post";
import { MarkdownViewer } from "@/shared/components/editor";
import { Comments } from "@/widgets/comments";

export default async function DiscussionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 토론 데이터 가져오기
  const discussion = await getDiscussion(id);

  // 조회수 증가
  await incrementViewCount(id);

  if (!discussion) {
    return <div>Discussion not found</div>;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 py-8">
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
          <PostLikeButton
            postId={id}
            initialLikes={discussion.likes_count}
            initialIsLiked={discussion.is_liked}
            size="sm"
          />
        </div>
        <div>
          <h1 className="mb-4 text-2xl font-bold">{discussion.title}</h1>
          <MarkdownViewer content={discussion.content} />
        </div>
      </div>

      <div className="border-t pt-8">
        <Comments postId={id} />
      </div>
    </div>
  );
}
