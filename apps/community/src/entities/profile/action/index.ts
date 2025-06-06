"use server";

import {
  getSupabaseServerClient,
  getUserFromSupabase,
} from "@packages/supabase";

import type { Profile } from "../model";

export async function getProfile(): Promise<Profile> {
  const user = await getUserFromSupabase();

  if (!user) {
    throw new Error("User not found");
  }

  const supabase = await getSupabaseServerClient();

  // 병렬로 모든 데이터를 가져옵니다
  const [profileResult, pointsResult] = await Promise.all([
    supabase
      .from("profiles")
      .select("username, avatar_url, role, created_at, updated_at")
      .eq("id", user.id)
      .single(),
    supabase.from("points").select("point").eq("author_id", user.id).single(),
  ]);

  if (profileResult.error) {
    throw new Error(profileResult.error.message);
  }

  // points는 존재하지 않을 수 있으므로 에러 처리를 다르게 합니다
  const points = pointsResult.error ? 0 : (pointsResult.data?.point ?? 0);

  return {
    ...profileResult.data,
    email: user.email ?? "",
    id: user.id,
    points,
  };
}

export async function getUserPostComments(userId: string) {
  const supabase = await getSupabaseServerClient();

  // 조인 쿼리로 최적화: posts와 comments를 한 번에 조인하여 처리
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
      user_like:likes(id, user_id),
      post:posts!inner(
        id,
        title,
        type,
        author_id
      )
    `,
    )
    .eq("post.author_id", userId); // 내가 작성한 포스트에 달린 댓글만

  // 현재 로그인한 사용자가 작성한 댓글 제외
  query = query.neq("author_id", userId);

  const { data: comments, error } = await query
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    console.error("Error fetching user posts comments:", error);
    throw error;
  }

  return (comments || []).map((comment) => ({
    ...comment,
    author: Array.isArray(comment.author) ? comment.author[0] : comment.author,
    likes_count: comment.likes?.[0]?.count || 0,
    is_liked: comment.user_like?.some((like) => like.user_id === userId),
    post: Array.isArray(comment.post) ? comment.post[0] : comment.post,
  }));
}

export async function getUserPosts(userId: string) {
  const supabase = await getSupabaseServerClient();

  const { data: posts, error } = await supabase
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
      thumbnail_url,
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
      likes:likes(count),
      user_like:likes(id, user_id)
    `,
    )
    .eq("author_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching user posts:", error);
    throw error;
  }

  return (posts || []).map((post) => ({
    ...post,
    author: Array.isArray(post.author) ? post.author[0] : post.author,
    comments_count: post.comments?.[0]?.count || 0,
    likes_count: post.likes?.[0]?.count || 0,
    solved: post.solved || false,
    is_liked: post.user_like?.some((like) => like.user_id === userId),
    content:
      post.content.length > 200
        ? post.content.slice(0, 200) + "..."
        : post.content,
  }));
}
