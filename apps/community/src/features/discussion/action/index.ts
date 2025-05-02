"use server";

import {
  getSupabaseServerClient,
  getUserFromSupabase,
} from "@/src/shared/supabase";

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

export async function deleteDiscussion(discussionId: string) {
  const supabase = await getSupabaseServerClient();
  const user = await getUserFromSupabase();

  if (!user) {
    return { error: "로그인이 필요합니다." };
  }

  try {
    // 작성자 확인
    const { data: discussion } = await supabase
      .from("posts")
      .select("author_id")
      .eq("id", discussionId)
      .single();

    if (!discussion || discussion.author_id !== user.id) {
      return { error: "삭제 권한이 없습니다." };
    }

    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", discussionId);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error("Error deleting discussion:", error);
    return { error: "토론 삭제 중 오류가 발생했습니다." };
  }
}
