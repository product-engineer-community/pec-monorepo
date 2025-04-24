import { GroupedComments } from "../model/types";
import { CommentItem } from "./CommentItem";

interface CommentListProps {
  groupedComments: GroupedComments;
  postId: string;
  currentUserId?: string;
}

export function CommentList({
  groupedComments,
  postId,
  currentUserId,
}: CommentListProps) {
  const commentsArray = Object.values(groupedComments);
  console.log("🚀 ~ commentsArray:", commentsArray);

  if (commentsArray.length === 0) {
    return (
      <div className="py-4 text-center text-muted-foreground">
        아직 댓글이 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {commentsArray.map(({ comment, replies }) => (
        <div key={comment.id} className="space-y-4">
          <CommentItem
            comment={comment}
            postId={postId}
            currentUserId={currentUserId}
          />

          {replies.length > 0 && (
            <div className="space-y-4">
              {replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  postId={postId}
                  currentUserId={currentUserId}
                  isReply
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
