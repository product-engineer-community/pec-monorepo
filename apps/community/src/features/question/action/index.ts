"use server";

import {
  getSupabaseServerClient,
  getUserFromSupabase,
} from "@/shared/supabase";

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
