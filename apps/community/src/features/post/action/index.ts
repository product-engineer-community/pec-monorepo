"use server";

import {
  getSupabaseServerClient,
  getUserFromSupabase,
} from "@/shared/supabase";

/**
 * 게시물 좋아요/좋아요 취소 토글 함수
 *
 * @param postId 게시물 ID
 * @returns 좋아요 상태와 오류 정보
 */
export async function togglePostLike(postId: string) {
  const supabase = await getSupabaseServerClient();

  const user = await getUserFromSupabase();

  if (!user) {
    return { error: "로그인이 필요합니다." };
  }

  const userId = user.id;

  // 기존 좋아요 확인
  const { data: existingLike } = await supabase
    .from("likes")
    .select()
    .eq("user_id", userId)
    .eq("post_id", postId)
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
        post_id: postId,
      });
      return { isLiked: true };
    }
  } catch (error) {
    console.error("Error toggling post like:", error);
    return { error: "좋아요 처리 중 오류가 발생했습니다." };
  }
}
