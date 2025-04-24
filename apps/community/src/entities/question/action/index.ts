"use server";

import { getSupabaseServerClient } from "@/shared/supabase";
import { QuestionWithAuthor } from "../model/types";

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
  } as QuestionWithAuthor & { is_liked: boolean };
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
