"use server";

import { type PostType } from "@pec/shared";
import { revalidatePath } from "next/cache";

import { getSupabaseServerClient, getUserFromSupabase } from "@/shared/supabase";

/**
 * 게시물 좋아요/좋아요 취소 토글 함수
 *
 * @param postId 게시물 ID
 * @returns 좋아요 상태와 오류 정보
 */
export async function togglePostLike(postId: string) {
  const supabase = await getSupabaseServerClient();

  const user = await getUserFromSupabase();

  if (!user) {
    return { error: "로그인이 필요합니다." };
  }

  const userId = user.id;

  // 기존 좋아요 확인
  const { data: existingLike } = await supabase
    .from("likes")
    .select()
    .eq("user_id", userId)
    .eq("post_id", postId)
    .maybeSingle();

  try {
    if (existingLike) {
      // 좋아요 취소
      await supabase.from("likes").delete().eq("id", existingLike.id);
      return { isLiked: false };
    } else {
      // 좋아요 추가
      await supabase.from("likes").insert({
        user_id: userId,
        post_id: postId,
      });
      return { isLiked: true };
    }
  } catch (error) {
    console.error("Error toggling post like:", error);
    return { error: "좋아요 처리 중 오류가 발생했습니다." };
  }
}

/**
 * 게시물 생성 함수
 *
 * @param formData 폼 데이터
 * @returns 생성된 게시물의 ID나 에러 메시지
 */
export async function createPost(formData: FormData) {
  const user = await getUserFromSupabase();

  if (!user) {
    return { error: "로그인이 필요합니다." };
  }

  try {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const postType = formData.get("postType") as PostType;
    const category = formData.get("category") as string;
    const tagsString = formData.get("tags") as string;
    const thumbnailUrl = formData.get("thumbnail_url") as string;

    // 유효성 검사
    if (!title || title.length < 5 || title.length > 200) {
      return { error: "제목은 5자 이상 200자 이하여야 합니다." };
    }

    if (!content || content.length < 10) {
      return { error: "내용은 10자 이상이어야 합니다." };
    }

    // 태그 처리
    const tags = tagsString ? JSON.parse(tagsString) : [];

    const supabase = await getSupabaseServerClient();

    // 게시물 기본 데이터
    const basePost = {
      title,
      content,
      type: postType,
      author_id: user.id,
    };

    // 게시물 유형별 추가 데이터
    let finalPost;
    switch (postType) {
      case "discussion":
        finalPost = {
          ...basePost,
          category: category || "",
          tags,
        };
        break;
      case "question":
        finalPost = {
          ...basePost,
          category: category || "",
          solved: false,
          answer_id: null,
        };
        break;
      case "post":
        finalPost = {
          ...basePost,
          thumbnail_url: thumbnailUrl || null,
        };
        break;
      default:
        finalPost = basePost;
    }

    const { data, error } = await supabase
      .from("posts")
      .insert(finalPost)
      .select()
      .single();

    if (error) throw error;

    // 캐시 무효화
    revalidatePath("/community");

    return { postId: data.id, success: true };
  } catch (error) {
    console.error("Error creating post:", error);
    return { error: "포스트 생성 중 오류가 발생했습니다." };
  }
}
