"use client";

import { Button, type Comment, Input } from "@pec/shared";
import { getRelativeTimeString } from "@pec/shared";
import { getSupabaseClient } from "@pec/supabase";
import { useMutation,useQuery } from "@tanstack/react-query";
import { HeartIcon } from "lucide-react";
import { useState } from "react";

import { useAuth } from "@/hooks/use-auth";

interface CommentsProps {
  postId: string;
}

type CommentWithAuthor = Comment & {
  author: {
    id: string;
    username: string;
    avatar_url: string | null;
    role: string;
  };
  likes_count: number;
  is_liked: boolean;
};

async function getComments(postId: string, userId?: string) {
  const supabase = getSupabaseClient();

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
      user_like:likes(id)
    `
    )
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  // userId가 있을 때만 user_like 필터링 추가
  if (userId) {
    query = query.eq("user_like.user_id", userId);
  }

  const { data: comments, error } = await query;

  if (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }

  return (comments || []).map(comment => ({
    ...comment,
    author: Array.isArray(comment.author) ? comment.author[0] : comment.author,
    likes_count: comment.likes?.[0]?.count || 0,
    is_liked: comment.user_like?.length > 0
  })) as CommentWithAuthor[];
}

export function Comments({ postId }: CommentsProps) {
  const supabase = getSupabaseClient();
  const { session } = useAuth();
  const [content, setContent] = useState("");

  const { data: comments = [], refetch } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getComments(postId, session?.user?.id),
  });

  const { mutate: toggleLike } = useMutation({
    mutationFn: async (commentId: string) => {
      if (!session?.user?.id) return;

      const { data: existingLike } = await supabase
        .from("likes")
        .select()
        .eq("user_id", session.user.id)
        .eq("comment_id", commentId)
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
            comment_id: commentId,
          });
      }
    },
    onSuccess: () => {
      refetch();
    },
  });

  const { mutate: addComment } = useMutation({
    mutationFn: async () => {
      if (!session?.user?.id) return;

      const { error } = await supabase.from("comments").insert({
        content,
        post_id: postId,
        author_id: session.user.id,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      setContent("");
      refetch();
    },
  });

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {comments.map((comment: CommentWithAuthor) => (
          <div
            key={comment.id}
            className="flex flex-col gap-2 p-4 border rounded-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                  {comment.author.username?.[0]?.toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">
                    {comment.author.username}
                  </span>
                  <span className="text-xs text-gray-500">
                    {getRelativeTimeString(comment.created_at)}
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleLike(comment.id)}
              >
                <HeartIcon className={comment.is_liked ? "fill-current" : ""} />
                <span>{comment.likes_count}</span>
              </Button>
            </div>
            <p className="text-sm">{comment.content}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="댓글을 입력하세요"
        />
        <Button onClick={() => addComment()}>댓글 작성</Button>
      </div>
    </div>
  );
}
