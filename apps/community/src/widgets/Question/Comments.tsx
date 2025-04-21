import { getRelativeTimeString } from "@pec/shared";

import { getComments } from "@/features/question/action";
import { CommentForm } from "@/features/question/ui/CommentForm";
import { CommentLikeButton } from "@/features/question/ui/CommentLikeButton";

interface CommentsProps {
  postId: string;
}

export async function Comments({ postId }: CommentsProps) {
  // 댓글 데이터 가져오기
  const comments = await getComments(postId);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">댓글 {comments.length}개</h2>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="flex flex-col gap-2 rounded-lg border p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
                  {comment.author.username?.[0]?.toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">
                    {comment.author.username}
                  </span>
                  <span className="text-xs text-gray-500">
                    {getRelativeTimeString(comment.created_at)}
                  </span>
                </div>
              </div>
              <CommentLikeButton
                commentId={comment.id}
                postId={postId}
                initialLikes={comment.likes_count}
                initialIsLiked={comment.is_liked}
              />
            </div>
            <p className="text-sm">{comment.content}</p>
          </div>
        ))}
      </div>

      <div className="pt-4">
        <CommentForm postId={postId} />
      </div>
    </div>
  );
}
