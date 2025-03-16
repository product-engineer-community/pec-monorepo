"use client";

import { Button } from "@pec/shared";
import Link from "next/link";
import { MarkdownViewer } from "@/shared/components/editor";
import { getSupabaseClient } from "@pec/supabase";
import { useQuery } from "@tanstack/react-query";
import { type Discussion } from "@pec/shared";
import { PostCardSkeleton } from "@pec/shared";

async function getDiscussions() {
  const supabase = getSupabaseClient();
  
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
    `
    )
    .eq("type", "discussion")
    .order("created_at", { ascending: false });

  if (postsError) {
    console.error("Error fetching discussions:", postsError);
    throw postsError;
  }

  return (discussions || []).map(discussion => ({
    ...discussion,
    author: Array.isArray(discussion.author) ? discussion.author[0] : discussion.author,
    comments_count: discussion.comments?.[0]?.count || 0,
    likes_count: discussion.likes?.[0]?.count || 0,
    content: discussion.content.length > 300 ? discussion.content.slice(0, 300) + '...' : discussion.content
  })) as (Discussion & {
    author: {
      id: string;
      username: string;
      avatar_url: string | null;
      role: "subscriber" | "participant" | "manager";
    };
  })[];
}

export default function DiscussionsPage() {
  const { data: discussions, isLoading, error } = useQuery({
    queryKey: ["discussions"],
    queryFn: getDiscussions,
  });

  if (error) {
    return <div>Error loading discussions</div>;
  }

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Discussions</h1>
        <Link href="/community/create?type=discussion">
          <Button>New Discussion</Button>
        </Link>
      </div>

      <div className="space-y-6">
        {isLoading ? (
          <PostCardSkeleton variant="discussion" />
        ) : (
          discussions?.map((discussion) => (
            <Link
              key={discussion.id}
              href={`/community/discussions/${discussion.id}`}
              className="block"
            >
              <div className="border rounded-lg p-6 hover:border-primary transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{discussion.title}</h2>
                    <div className="flex gap-2 text-sm text-muted-foreground mb-4">
                      <span>{discussion.author.username}</span>
                      <span>•</span>
                      <span>{new Date(discussion.created_at).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{discussion.category}</span>
                    </div>
                    <div className="flex gap-2 mb-4">
                      {discussion.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-secondary text-sm rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>{discussion.views_count} views</span>
                    <span>{discussion.likes_count} likes</span>
                    <span>{discussion.comments_count} comments</span>
                  </div>
                </div>
                <MarkdownViewer content={discussion.content} />
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
