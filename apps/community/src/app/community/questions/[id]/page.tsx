"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSupabaseClient } from "@pec/supabase";
import { useAuth } from "@/hooks/use-auth";
import { Button, Question } from "@pec/shared";
import { getRelativeTimeString } from "@pec/shared";
import { HeartIcon } from "lucide-react";
import { Comments } from "./comments";
import { MarkdownViewer } from "@/src/shared/components/editor";
import { useEffect } from "react";

async function getQuestion(id: string, userId?: string) {
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
    author: Array.isArray(question.author) ? question.author[0] : question.author,
    comments_count: question.comments?.[0]?.count || 0,
    likes_count: question.likes?.[0]?.count || 0,
    is_liked: question.user_like?.length > 0
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

export default function QuestionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const supabase = getSupabaseClient();

  const { data: question, isLoading } = useQuery({
    queryKey: ["question", params.id],
    queryFn: () => getQuestion(params.id, session?.user?.id),
  });

  useEffect(() => {
    const updateViewCount = async () => {
      try {
        await incrementViewCount(params.id);
      } catch (error) {
        console.error("Error updating view count:", error);
      }
    };

    updateViewCount();
  }, [params.id]); // 컴포넌트 마운트 시 한 번만 실행

  const { mutate: toggleLike } = useMutation({
    mutationFn: async () => {
      if (!session?.user?.id) return;

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
      queryClient.invalidateQueries({ queryKey: ["question", params.id] });
    },
  });

  if (isLoading) {
    return <div></div>;
  }

  if (!question) {
    return <div>Question not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
              {question.author.username?.[0]?.toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">
                {question.author.username}
              </span>
              <span className="text-xs text-gray-500">
                {getRelativeTimeString(question.created_at)}
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleLike()}
            className="flex items-center gap-2"
          >
            <HeartIcon
              className={question.is_liked ? "fill-current" : ""}
            />
            <span>{question.likes_count}</span>
          </Button>
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-4">{question.title}</h1>
          <MarkdownViewer content={question.content} />
        </div>
      </div>

      <div className="pt-8 border-t">
        <Comments postId={params.id} />
      </div>
    </div>
  );
}
