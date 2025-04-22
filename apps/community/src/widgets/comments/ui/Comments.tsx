import {
  CommentForm,
  CommentList,
  getComments,
  groupComments,
} from "@/features/comment";
import { getAuthSession } from "@/shared/supabase/action";

interface CommentsProps {
  postId: string;
}

export async function Comments({ postId }: CommentsProps) {
  const session = await getAuthSession();
  const comments = await getComments(postId);
  const groupedComments = groupComments(comments);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">댓글 {comments.length}개</h2>

      {/* 댓글 작성 폼 */}
      <div className="pb-6 pt-2">
        <CommentForm postId={postId} />
      </div>

      {/* 댓글 목록 */}
      <CommentList
        groupedComments={groupedComments}
        postId={postId}
        currentUserId={session?.user?.id}
      />
    </div>
  );
}
