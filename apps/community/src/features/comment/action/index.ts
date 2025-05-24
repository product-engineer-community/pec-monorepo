"use server";

import { grantPointAction } from "@packages/point/src/features";
import {
  getSupabaseServerClient,
  getUserFromSupabase,
} from "@packages/supabase";
import { CommentNotification } from "@packages/transactional"; // Or correct path
import { revalidatePath } from "next/cache";

import { sendEmail } from "../../../shared/api/email"; // Adjust relative path as needed
import { CommentWithAuthor } from "../model/types";

/**
 * 게시물의 모든 댓글을 가져오는 함수
 */
export async function getComments(
  postId: string,
): Promise<CommentWithAuthor[]> {
  const supabase = await getSupabaseServerClient();
  const user = await getUserFromSupabase();
  const userId = user?.id;

  const { data: comments, error } = await supabase
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
      user_like:likes(id, user_id)
    `,
    )
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }

  return (comments || []).map((comment) => ({
    ...comment,
    author: Array.isArray(comment.author) ? comment.author[0] : comment.author,
    likes_count: comment.likes?.[0]?.count || 0,
    is_liked: userId
      ? comment.user_like?.some((like) => like.user_id === userId)
      : false,
  })) as CommentWithAuthor[];
}

/**
 * 댓글 생성 함수
 */
export async function createComment(
  postId: string,
  content: string,
  parentId: string | null = null,
) {
  const user = await getUserFromSupabase();
  const userId = user?.id;

  if (!userId) {
    throw new Error("로그인이 필요합니다.");
  }

  if (!content.trim()) {
    throw new Error("댓글 내용을 입력해주세요.");
  }

  const supabase = await getSupabaseServerClient();
  const { error } = await supabase.from("comments").insert({
    content,
    post_id: postId,
    author_id: userId,
    parent_id: parentId,
  });

  if (error) throw error;

  await grantPointAction(userId, "comment");

  // Send email notification
  try {
    const { data: postData, error: postError } = await supabase
      .from("posts") // Assuming 'posts' is the table name
      .select("author_id, title, type") // 'type' is used for URL generation
      .eq("id", postId)
      .single();

    if (postError || !postData) {
      console.error(
        "Error fetching post details for email notification:",
        postError,
      );
    } else if (postData && postData.author_id) {
      // Proceed only if author_id is available
      const { data: authorData, error: authorError } = await supabase
        .from("profiles") // Assuming 'profiles' is the table for user details
        .select("email, username") // or 'full_name', 'name' etc.
        .eq("id", postData.author_id)
        .single();

      if (authorError || !authorData) {
        console.error(
          "Error fetching post author details for email notification:",
          authorError,
        );
      } else if (authorData.email && userId !== postData.author_id) {
        // Send email only if author has an email and the commenter is not the author
        const commenterName =
          user?.user_metadata?.username || user?.email || "A user";
        const postUrl = `https://www.productengineer.info/community/${postData.type}/${postId}`; // Construct the URL

        await sendEmail({
          recipientEmail: authorData.email,
          title: `New comment on your post: "${postData.title}"`,
          reactElement: CommentNotification({
            postAuthorName: authorData.username || authorData.email,
            commenterName: commenterName,
            postTitle: postData.title,
            commentUrl: postUrl,
            commentContentSnippet: content, // Or a snippet of 'content' if you prefer
            appName: "PEC", // Added
            baseUrl: "https://www.productengineer.info", // Added
          }),
        });
        console.log(
          `Comment notification email sent to ${authorData.email}`,
        );
      }
    }
  } catch (emailError) {
    console.error("Failed to send comment notification email:", emailError);
    // Do not throw error here to prevent createComment from failing if email sending fails
  }

  revalidatePath(`/community/discussions/${postId}`);
  revalidatePath(`/community/questions/${postId}`);
}

/**
 * 댓글 삭제 함수
 */
export async function deleteComment(commentId: string, postId: string) {
  const user = await getUserFromSupabase();
  const userId = user?.id;

  if (!userId) {
    throw new Error("로그인이 필요합니다.");
  }

  const supabase = await getSupabaseServerClient();
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId)
    .eq("author_id", userId);

  if (error) throw error;

  revalidatePath(`/community/discussions/${postId}`);
  revalidatePath(`/community/questions/${postId}`);
}

/**
 * 댓글 좋아요 토글 함수
 */
export async function toggleCommentLike(commentId: string, postId: string) {
  const user = await getUserFromSupabase();
  const userId = user?.id;

  if (!userId) {
    throw new Error("로그인이 필요합니다.");
  }

  const supabase = await getSupabaseServerClient();
  const { data: existingLike } = await supabase
    .from("likes")
    .select()
    .eq("user_id", userId)
    .eq("comment_id", commentId)
    .maybeSingle();

  if (existingLike) {
    await supabase.from("likes").delete().eq("id", existingLike.id);
  } else {
    await supabase.from("likes").insert({
      user_id: userId,
      comment_id: commentId,
    });
  }

  revalidatePath(`/community/discussions/${postId}`);
  revalidatePath(`/community/questions/${postId}`);
}
