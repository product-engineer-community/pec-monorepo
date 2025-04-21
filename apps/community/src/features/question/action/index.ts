"use server";
import type { Question } from "@pec/shared";
import { createServerSupabase } from "@pec/supabase";
import { cookies } from "next/headers";

export async function getQuestions() {
  const cookieStore = cookies();
  const supabase = createServerSupabase(process.env, cookieStore);

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
