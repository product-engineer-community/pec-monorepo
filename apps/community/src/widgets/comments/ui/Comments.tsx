import { getIsAuthenticated } from "@packages/auth/src/features";
import {
  AUTH_PATHNAME,
  getOrigin,
  SIGN_IN_PATHNAME,
} from "@packages/constants";
import { getAuthSession } from "@packages/supabase";
import Link from "next/link";

import {
  CommentForm,
  CommentList,
  getComments,
  groupComments,
} from "@/features/comment";

interface CommentsProps {
  postId: string;
}

export async function Comments({ postId }: CommentsProps) {
  const session = await getAuthSession();
  const isAuthenticated = await getIsAuthenticated();
  const comments = await getComments(postId);
  const groupedComments = groupComments(comments);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">댓글 {comments.length}개</h2>

      {/* 댓글 작성 폼 */}
      <div className="pb-6 pt-2">
        {isAuthenticated ? (
          <CommentForm postId={postId} />
        ) : (
          <Link
            href={`${getOrigin()}${AUTH_PATHNAME}${SIGN_IN_PATHNAME}`}
            className="text-center text-sm text-muted-foreground"
          >
            <strong className="underline">로그인</strong> 후 댓글을 작성할 수
            있습니다.
          </Link>
        )}
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
