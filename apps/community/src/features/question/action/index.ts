"use server";
import type { Question } from "@pec/shared";

import { togglePostLike } from "@/features/post";
import { getSupabaseServerClient } from "@/shared/supabase";

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

export async function getQuestion(id: string, userId?: string) {
  const supabase = await getSupabaseServerClient();

  let query = supabase
    .from("posts")
    .select(
      `
      *,
      author:profiles!posts_author_id_fkey(
        id,
        username,
        avatar_url,
        role
      ),
      comments:comments(count),
      likes:likes(count),
      user_like:likes(id)
    `,
    )
    .eq("id", id);

  if (userId) {
    query = query.eq("user_like.user_id", userId);
  }

  const { data: question, error } = await query.single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    console.error("Error fetching question:", error);
    throw error;
  }

  if (!question) {
    return null;
  }

  return {
    ...question,
    author: Array.isArray(question.author)
      ? question.author[0]
      : question.author,
    comments_count: question.comments?.[0]?.count || 0,
    likes_count: question.likes?.[0]?.count || 0,
    is_liked: question.user_like?.length > 0,
  };
}

export async function incrementViewCount(id: string) {
  const supabase = await getSupabaseServerClient();

  const { error } = await supabase
    .rpc("increment_view_count", { post_id: id })
    .select();

  if (error) {
    console.error("Error incrementing view count:", error);
    throw error;
  }
}

export async function getComments(postId: string, userId?: string) {
  const supabase = await getSupabaseServerClient();

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

  if (userId) {
    query = query.eq("user_like.user_id", userId);
  }

  const { data: comments, error } = await query;

  if (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }

  return (comments || []).map((comment) => ({
    ...comment,
    author: Array.isArray(comment.author) ? comment.author[0] : comment.author,
    likes_count: comment.likes?.[0]?.count || 0,
    is_liked: comment.user_like?.length > 0,
  }));
}

export { togglePostLike };

export async function toggleCommentLike(commentId: string) {
  const supabase = await getSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return { error: "로그인이 필요합니다." };
  }

  const userId = session.user.id;

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

export async function addComment(formData: FormData) {
  const supabase = await getSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return { error: "로그인이 필요합니다." };
  }

  const content = formData.get("content") as string;
  const postId = formData.get("postId") as string;
  const parentId = formData.get("parentId") as string | null;

  if (!content?.trim()) {
    return { error: "댓글 내용을 입력해주세요." };
  }

  try {
    const { data, error } = await supabase
      .from("comments")
      .insert({
        content,
        post_id: postId,
        author_id: session.user.id,
        parent_id: parentId || null,
      })
      .select()
      .single();

    if (error) throw error;

    return { success: true, comment: data };
  } catch (error) {
    console.error("Error adding comment:", error);
    return { error: "댓글 작성 중 오류가 발생했습니다." };
  }
}

export async function deleteComment(commentId: string) {
  const supabase = await getSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return { error: "로그인이 필요합니다." };
  }

  try {
    // 작성자 확인
    const { data: comment } = await supabase
      .from("comments")
      .select()
      .eq("id", commentId)
      .single();

    if (!comment || comment.author_id !== session.user.id) {
      return { error: "삭제 권한이 없습니다." };
    }

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
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return { error: "로그인이 필요합니다." };
  }

  const content = formData.get("content") as string;
  const commentId = formData.get("commentId") as string;

  if (!content?.trim()) {
    return { error: "댓글 내용을 입력해주세요." };
  }

  try {
    // 작성자 확인
    const { data: comment } = await supabase
      .from("comments")
      .select()
      .eq("id", commentId)
      .single();

    if (!comment || comment.author_id !== session.user.id) {
      return { error: "수정 권한이 없습니다." };
    }

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
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return { error: "로그인이 필요합니다." };
  }

  try {
    // 작성자 확인
    const { data: question } = await supabase
      .from("posts")
      .select("author_id")
      .eq("id", questionId)
      .single();

    if (!question || question.author_id !== session.user.id) {
      return { error: "삭제 권한이 없습니다." };
    }

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
