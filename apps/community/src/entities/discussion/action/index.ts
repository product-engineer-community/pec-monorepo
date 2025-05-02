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
  }));
}
