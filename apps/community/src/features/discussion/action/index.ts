"use server";

import type { Discussion } from "@pec/shared";

import { getSupabaseServerClient } from "@/src/shared/supabase";

export async function getDiscussions() {
  const supabase = await getSupabaseServerClient();

  const { data: discussions, error: postsError } = await supabase
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
    .eq("type", "discussion")
    .order("created_at", { ascending: false });

  if (postsError) {
    console.error("Error fetching discussions:", postsError);
    throw postsError;
  }

  return (discussions || []).map((discussion) => ({
    ...discussion,
    author: Array.isArray(discussion.author)
      ? discussion.author[0]
      : discussion.author,
    comments_count: discussion.comments?.[0]?.count || 0,
    likes_count: discussion.likes?.[0]?.count || 0,
    content:
      discussion.content.length > 300
        ? discussion.content.slice(0, 300) + "..."
        : discussion.content,
  })) as (Discussion & {
    author: {
      id: string;
      username: string;
      avatar_url: string | null;
      role: "subscriber" | "participant" | "manager";
    };
  })[];
}

export async function getDiscussion(id: string, userId?: string) {
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

  const { data: discussion, error } = await query.single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    console.error("Error fetching discussion:", error);
    throw error;
  }

  if (!discussion) {
    return null;
  }

  return {
    ...discussion,
    author: Array.isArray(discussion.author)
      ? discussion.author[0]
      : discussion.author,
    comments_count: discussion.comments?.[0]?.count || 0,
    likes_count: discussion.likes?.[0]?.count || 0,
    is_liked: discussion.user_like?.length > 0,
  } as Discussion & {
    author: {
      id: string;
      username: string;
      avatar_url: string | null;
      role: "subscriber" | "participant" | "manager";
    };
    is_liked: boolean;
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

export async function deleteDiscussion(discussionId: string) {
  const supabase = await getSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return { error: "로그인이 필요합니다." };
  }

  try {
    // 작성자 확인
    const { data: discussion } = await supabase
      .from("posts")
      .select("author_id")
      .eq("id", discussionId)
      .single();

    if (!discussion || discussion.author_id !== session.user.id) {
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
