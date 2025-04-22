"use server";

import type { Discussion } from "@pec/shared";
import { getSupabaseClient } from "@pec/supabase";

export async function getDiscussions() {
  const supabase = await getSupabaseClient();

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
  const supabase = getSupabaseClient();
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
  const supabase = getSupabaseClient();
  const { error } = await supabase
    .rpc("increment_view_count", { post_id: id })
    .select();

  if (error) {
    console.error("Error incrementing view count:", error);
    throw error;
  }
}
