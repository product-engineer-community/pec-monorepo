"use server";

import { getSupabaseServerClient } from "@/shared/supabase";

import { Post } from "../model";

/**
 * ID를 기반으로 게시물을 가져오는 함수
 * question, discussion, article 타입의 게시물을 모두 처리합니다
 */
export async function getPost(id: string): Promise<Post | null> {
  const supabase = await getSupabaseServerClient();

  const query = supabase
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

  const { data: post, error } = await query.single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    console.error(`Error fetching post (id: ${id}):`, error);
    throw error;
  }

  if (!post) {
    return null;
  }

  return {
    ...post,
    author: Array.isArray(post.author) ? post.author[0] : post.author,
    comments_count: post.comments?.[0]?.count || 0,
    likes_count: post.likes?.[0]?.count || 0,
    is_liked: post.user_like?.length > 0,
  };
}

/**
 * 타입을 기반으로 게시물 목록을 가져오는 함수
 * 'question', 'discussion', 'article' 타입의 게시물을 구분하여 처리합니다
 */
export async function getPosts(type: "question" | "discussion" | "article") {
  const supabase = await getSupabaseServerClient();

  const query = supabase
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
    .eq("type", type)
    .order("created_at", { ascending: false });

  const { data: posts, error } = await query;

  if (error) {
    console.error(`Error fetching ${type}s:`, error);
    throw error;
  }

  return (posts || []).map((post) => ({
    ...post,
    author: Array.isArray(post.author) ? post.author[0] : post.author,
    comments_count: post.comments?.[0]?.count || 0,
    likes_count: post.likes?.[0]?.count || 0,
    solved: type === "question" ? post.solved || false : undefined,
    content:
      post.content.length > 300
        ? post.content.slice(0, 300) + "..."
        : post.content,
  }));
}

/**
 * 게시물 조회수 증가 함수
 */
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
