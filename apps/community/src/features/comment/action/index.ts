"use server";

import { revalidatePath } from "next/cache";

import {
  getSupabaseServerClient,
  getUserFromSupabase,
} from "@/shared/supabase";

import { CommentWithAuthor } from "../model/types";

/**
 * 게시물의 모든 댓글을 가져오는 함수
 */
export async function getComments(
  postId: string,
): Promise<CommentWithAuthor[]> {
  const supabase = await getSupabaseServerClient();
  const user = await getUserFromSupabase();
  const userId = user?.id;

  let query = supabase
    .from("comments")
    .select(
      `
      id,
      content,
      created_at,
      updated_at,
      post_id,
      author_id,
      parent_id,
      author:profiles!comments_author_id_fkey(
        id,
        username,
        avatar_url,
        role
      ),
      likes:likes(count),
      user_like:likes(id)
    `,
    )
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  // userId가 있을 때만 user_like 필터링 추가
  if (userId) {
    query = query.eq("user_like.user_id", userId);
  }

  const { data: comments, error } = await query;

  if (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (comments || []).map((comment: any) => ({
    ...comment,
    author: Array.isArray(comment.author) ? comment.author[0] : comment.author,
    likes_count: comment.likes?.[0]?.count || 0,
    is_liked: comment.user_like?.length > 0,
  })) as CommentWithAuthor[];
}

/**
 * 댓글 생성 함수
 */
export async function createComment(
  postId: string,
  content: string,
  parentId: string | null = null,
) {
  const user = await getUserFromSupabase();
  const userId = user?.id;

  if (!userId) {
    throw new Error("로그인이 필요합니다.");
  }

  if (!content.trim()) {
    throw new Error("댓글 내용을 입력해주세요.");
  }

  const supabase = await getSupabaseServerClient();
  const { error } = await supabase.from("comments").insert({
    content,
    post_id: postId,
    author_id: userId,
    parent_id: parentId,
  });

  if (error) throw error;

  revalidatePath(`/community/discussions/${postId}`);
  revalidatePath(`/community/questions/${postId}`);
}

/**
 * 댓글 삭제 함수
 */
export async function deleteComment(commentId: string, postId: string) {
  const user = await getUserFromSupabase();
  const userId = user?.id;

  if (!userId) {
    throw new Error("로그인이 필요합니다.");
  }

  const supabase = await getSupabaseServerClient();
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId)
    .eq("author_id", userId);

  if (error) throw error;

  revalidatePath(`/community/discussions/${postId}`);
  revalidatePath(`/community/questions/${postId}`);
}

/**
 * 댓글 좋아요 토글 함수
 */
export async function toggleCommentLike(commentId: string, postId: string) {
  const user = await getUserFromSupabase();
  const userId = user?.id;

  if (!userId) {
    throw new Error("로그인이 필요합니다.");
  }

  const supabase = await getSupabaseServerClient();
  const { data: existingLike } = await supabase
    .from("likes")
    .select()
    .eq("user_id", userId)
    .eq("comment_id", commentId)
    .maybeSingle();

  if (existingLike) {
    await supabase.from("likes").delete().eq("id", existingLike.id);
  } else {
    await supabase.from("likes").insert({
      user_id: userId,
      comment_id: commentId,
    });
  }

  revalidatePath(`/community/discussions/${postId}`);
  revalidatePath(`/community/questions/${postId}`);
}
