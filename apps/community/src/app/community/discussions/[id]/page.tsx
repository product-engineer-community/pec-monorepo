"use client";

import { useAuth } from "@/hooks/use-auth";
import { getSupabaseClient } from "@pec/supabase";
import { type Discussion, getRelativeTimeString } from "@pec/shared";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MarkdownViewer } from "@/shared/components/editor";
import { Button } from "@pec/shared";
import { HeartIcon } from "lucide-react";
import { Comments } from "./comments";
import { useEffect } from "react";
import { toast } from "sonner";

async function getDiscussion(id: string, userId?: string) {
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
    `
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
    author: Array.isArray(discussion.author) ? discussion.author[0] : discussion.author,
    comments_count: discussion.comments?.[0]?.count || 0,
    likes_count: discussion.likes?.[0]?.count || 0,
    is_liked: discussion.user_like?.length > 0
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

async function incrementViewCount(id: string) {
  const supabase = getSupabaseClient();
  const { error } = await supabase
    .rpc('increment_view_count', { post_id: id })
    .select();

  if (error) {
    console.error("Error incrementing view count:", error);
    throw error;
  }
}

export default function DiscussionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const supabase = getSupabaseClient();

  const { data: discussion, isLoading } = useQuery({
    queryKey: ["discussion", params.id],
    queryFn: () => getDiscussion(params.id, session?.user?.id),
  });

  useEffect(() => {
    const updateViewCount = async () => {
      try {
        await incrementViewCount(params.id);
        queryClient.invalidateQueries({ queryKey: ["discussion", params.id] });
      } catch (error) {
        console.error("Error updating view count:", error);
      }
    };

    updateViewCount();
  }, [params.id, queryClient]);

  const likeMutation = useMutation({
    mutationFn: async () => {
      if (!session) {
        toast.error("로그인이 필요합니다.");
        return;
      }

      const { data: existingLike } = await supabase
        .from("likes")
        .select()
        .eq("user_id", session.user.id)
        .eq("post_id", params.id)
        .maybeSingle();

      if (existingLike) {
        await supabase
          .from("likes")
          .delete()
          .eq("id", existingLike.id);

      } else {
        await supabase
          .from("likes")
          .insert({
            user_id: session.user.id,
            post_id: params.id,
          });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discussion", params.id] });
    },
    onError: (error) => {
      console.error("Error toggling like:", error);
      toast.error("좋아요 처리 중 오류가 발생했습니다.");
    },
  });

  if (isLoading) {
    return <div></div>;
  }

  if (!discussion) {
    return <div>Discussion not found</div>;
  }

  return (
    <div className="container py-6">
      <div className="border rounded-lg p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-4">{discussion.title}</h1>
            <div className="flex gap-2 text-sm text-muted-foreground mb-4">
              <span>{discussion.author.username}</span>
              <span>•</span>
              <span>{getRelativeTimeString(discussion.created_at)}</span>
              <span>•</span>
              <span>{discussion.category}</span>
            </div>
            <div className="flex gap-2">
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
          <div className="flex gap-4 items-center">
            <div className="text-sm text-muted-foreground">
              조회수 {discussion.views_count}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => likeMutation.mutate()}
              className="flex items-center gap-2"
            >
              <HeartIcon
                className={discussion.is_liked ? "fill-current" : ""}
              />
              <span>{discussion.likes_count}</span>
            </Button>
          </div>
        </div>

        <div className="prose max-w-none dark:prose-invert">
          <MarkdownViewer content={discussion.content} />
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">
          댓글 {discussion.comments_count}개
        </h2>
        <Comments postId={params.id} />
      </div>
    </div>
  );
}
