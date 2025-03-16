import { useAuth } from "@/hooks/use-auth";
import { getSupabaseClient } from "@pec/supabase";
import { type Comment, getRelativeTimeString } from "@pec/shared";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@pec/shared";
import { HeartIcon, ReplyIcon, TrashIcon } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { Editor } from "@/shared/components/editor";

interface CommentsProps {
  postId: string;
}

interface CommentWithAuthor extends Comment {
  author: {
    id: string;
    username: string;
    avatar_url: string | null;
    role: string;
  };
  likes_count: number;
  is_liked: boolean;
}

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
  })) as (Comment & {
    author: {
      id: string;
      username: string;
      avatar_url: string | null;
      role: "subscriber" | "participant" | "manager";
    };
    is_liked: boolean;
  })[];
}

export function Comments({ postId }: CommentsProps) {
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getComments(postId, session?.user?.id),
  });

  const createCommentMutation = useMutation({
    mutationFn: async () => {
      if (!session) {
        toast.error("로그인이 필요합니다.");
        return;
      }

      if (!content.trim()) {
        toast.error("댓글 내용을 입력해주세요.");
        return;
      }

      const supabase = getSupabaseClient();
      const { error } = await supabase.from("comments").insert({
        content,
        post_id: postId,
        author_id: session.user.id,
        parent_id: replyTo,
      });

      if (error) throw error;

      setContent("");
      setReplyTo(null);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      queryClient.invalidateQueries({ queryKey: ["discussion", postId] });
    },
    onError: (error) => {
      console.error("Error creating comment:", error);
      toast.error("댓글 작성 중 오류가 발생했습니다.");
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: async (commentId: string) => {
      if (!session) {
        toast.error("로그인이 필요합니다.");
        return;
      }

      const supabase = getSupabaseClient();
      const { error } = await supabase
        .from("comments")
        .delete()
        .eq("id", commentId)
        .eq("author_id", session.user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      queryClient.invalidateQueries({ queryKey: ["discussion", postId] });
    },
    onError: (error) => {
      console.error("Error deleting comment:", error);
      toast.error("댓글 삭제 중 오류가 발생했습니다.");
    },
  });

  const likeCommentMutation = useMutation({
    mutationFn: async (commentId: string) => {
      if (!session) {
        toast.error("로그인이 필요합니다.");
        return;
      }

      const supabase = getSupabaseClient();
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
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
    onError: (error) => {
      console.error("Error toggling comment like:", error);
      toast.error("좋아요 처리 중 오류가 발생했습니다.");
    },
  });

  const groupedComments = comments.reduce((acc, comment) => {
    if (!comment.parent_id) {
      acc[comment.id] = {
        comment,
        replies: comments.filter((c) => c.parent_id === comment.id),
      };
    }
    return acc;
  }, {} as Record<string, { comment: CommentWithAuthor; replies: CommentWithAuthor[] }>);

  if (isLoading) {
    return <div>Loading comments...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Comment Editor */}
      <div className="border rounded-lg p-4">
        <Editor
          content={content}
          onChange={setContent}
        />
        <div className="flex justify-between items-center mt-4">
          {replyTo && (
            <Button
              variant="ghost"
              onClick={() => setReplyTo(null)}
            >
              답글 취소
            </Button>
          )}
          <Button
            className="ml-auto"
            onClick={() => createCommentMutation.mutate()}
          >
            {replyTo ? "답글 작성" : "댓글 작성"}
          </Button>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {Object.values(groupedComments).map(({ comment, replies }) => (
          <div key={comment.id} className="space-y-4">
            {/* Parent Comment */}
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{comment.author.username}</span>
                  <span className="text-sm text-muted-foreground">
                    {getRelativeTimeString(comment.created_at)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => likeCommentMutation.mutate(comment.id)}
                  >
                    <HeartIcon
                      className={comment.is_liked ? "fill-current" : ""}
                    />
                    <span className="ml-1">{comment.likes_count}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setReplyTo(comment.id)}
                  >
                    <ReplyIcon />
                  </Button>
                  {session?.user.id === comment.author_id && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteCommentMutation.mutate(comment.id)}
                    >
                      <TrashIcon className="text-destructive" />
                    </Button>
                  )}
                </div>
              </div>
              <div className="prose dark:prose-invert">
                {comment.content}
              </div>
            </div>

            {/* Replies */}
            {replies.length > 0 && (
              <div className="ml-8 space-y-4">
                {replies.map((reply) => (
                  <div key={reply.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">
                          {reply.author.username}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {getRelativeTimeString(reply.created_at)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => likeCommentMutation.mutate(reply.id)}
                        >
                          <HeartIcon
                            className={reply.is_liked ? "fill-current" : ""}
                          />
                          <span className="ml-1">{reply.likes_count}</span>
                        </Button>
                        {session?.user.id === reply.author_id && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              deleteCommentMutation.mutate(reply.id)
                            }
                          >
                            <TrashIcon className="text-destructive" />
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="prose dark:prose-invert">
                      {reply.content}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
