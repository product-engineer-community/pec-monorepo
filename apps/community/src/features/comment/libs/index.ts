import { CommentWithAuthor } from "../model/types";

/**
 * 댓글 그룹화 함수 (부모 댓글과 답글로 구분)
 */
export function groupComments(comments: CommentWithAuthor[]) {
  return comments.reduce(
    (acc, comment) => {
      if (!comment.parent_id) {
        acc[comment.id] = {
          comment,
          replies: comments.filter((c) => c.parent_id === comment.id),
        };
      }
      return acc;
    },
    {} as Record<
      string,
      { comment: CommentWithAuthor; replies: CommentWithAuthor[] }
    >,
  );
}
