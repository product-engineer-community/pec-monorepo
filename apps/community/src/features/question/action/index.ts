"use server";
import type { Question } from "@pec/shared";

import { getQuestion, incrementViewCount } from "@/entities/question";
import { togglePostLike } from "@/features/post";
import {
  getSupabaseServerClient,
  getUserFromSupabase,
} from "@/shared/supabase";

export async function getQuestions() {
  const supabase = await getSupabaseServerClient();

  const { data: questions, error: postsError } = await supabase
    .from("posts")
    .select(
      `
      id,
      title,
      content,
      created_at,
      updated_at,
      views_count,
      category,
      tags,
      type,
      author_id,
      solved,
      answer_id,
      author:profiles!posts_author_id_fkey(
        id,
        username,
        avatar_url,
        role
      ),
      comments:comments(count),
      likes:likes(count)
    `,
    )
    .eq("type", "question")
    .order("created_at", { ascending: false });

  if (postsError) {
    console.error("Error fetching questions:", postsError);
    throw postsError;
  }

  return (questions || []).map((question) => ({
    ...question,
    author: Array.isArray(question.author)
      ? question.author[0]
      : question.author,
    comments_count: question.comments?.[0]?.count || 0,
    likes_count: question.likes?.[0]?.count || 0,
    solved: question.solved || false,
    content:
      question.content.length > 300
        ? question.content.slice(0, 300) + "..."
        : question.content,
  })) as (Question & {
    author: {
      id: string;
      username: string;
      avatar_url: string | null;
      role: "subscriber" | "participant" | "manager";
    };
  })[];
}

export { getQuestion, incrementViewCount, togglePostLike };

export async function toggleCommentLike(commentId: string) {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "로그인이 필요합니다." };
  }

  const userId = user.id;

  // 기존 좋아요 확인
  const { data: existingLike } = await supabase
    .from("likes")
    .select()
    .eq("user_id", userId)
    .eq("comment_id", commentId)
    .maybeSingle();

  try {
    if (existingLike) {
      // 좋아요 취소
      await supabase.from("likes").delete().eq("id", existingLike.id);
      return { isLiked: false };
    } else {
      // 좋아요 추가
      await supabase.from("likes").insert({
        user_id: userId,
        comment_id: commentId,
      });
      return { isLiked: true };
    }
  } catch (error) {
    console.error("Error toggling comment like:", error);
    return { error: "좋아요 처리 중 오류가 발생했습니다." };
  }
}

export async function deleteComment(commentId: string) {
  const supabase = await getSupabaseServerClient();
  const user = await getUserFromSupabase();

  if (!user) {
    return { error: "로그인이 필요합니다." };
  }

  try {
    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("id", commentId);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error("Error deleting comment:", error);
    return { error: "댓글 삭제 중 오류가 발생했습니다." };
  }
}

export async function updateComment(formData: FormData) {
  const supabase = await getSupabaseServerClient();
  const user = await getUserFromSupabase();

  if (!user) {
    return { error: "로그인이 필요합니다." };
  }

  const content = formData.get("content") as string;
  const commentId = formData.get("commentId") as string;

  if (!content?.trim()) {
    return { error: "댓글 내용을 입력해주세요." };
  }

  try {
    const { data, error } = await supabase
      .from("comments")
      .update({ content, updated_at: new Date().toISOString() })
      .eq("id", commentId)
      .select()
      .single();

    if (error) throw error;

    return { success: true, comment: data };
  } catch (error) {
    console.error("Error updating comment:", error);
    return { error: "댓글 수정 중 오류가 발생했습니다." };
  }
}

export async function deleteQuestion(questionId: string) {
  const supabase = await getSupabaseServerClient();
  const user = await getUserFromSupabase();

  if (!user) {
    return { error: "로그인이 필요합니다." };
  }

  try {
    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", questionId);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error("Error deleting question:", error);
    return { error: "질문 삭제 중 오류가 발생했습니다." };
  }
}
