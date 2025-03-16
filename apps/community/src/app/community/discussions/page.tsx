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
  const { data, error } = await supabase
    .from("posts")
    .select(`
      *,
      author:profiles!posts_author_id_fkey(
        id,
        username,
        avatar_url,
        role
      )
    `)
    .eq("type", "discussion")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching discussions:", error);
    throw error;
  }
  return data as (Discussion & { author: { id: string; username: string; avatar_url: string | null; role: string } })[];
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
