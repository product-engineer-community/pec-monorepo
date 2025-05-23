"use server";

import {
  COMMUNITY_ARTICLES_PATHNAME,
  COMMUNITY_DISCUSSIONS_PATHNAME,
  COMMUNITY_QUESTIONS_PATHNAME,
} from "@packages/constants";
import { grantPointAction } from "@packages/point/src/features";
import {
  getSupabaseServerClient,
  getUserFromSupabase,
} from "@packages/supabase";
import { noop, PostType } from "@packages/ui";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { match } from "ts-pattern";

import { NotifyChannel, notifyPost } from "@/src/shared/api";

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

  const { data: post } = await supabase
    .from("posts")
    .select("type")
    .eq("id", postId)
    .single();

  // 기존 좋아요 확인
  const { data: existingLike } = await supabase
    .from("likes")
    .select()
    .eq("user_id", userId)
    .eq("post_id", postId)
    .maybeSingle();

  try {
    const { error } = existingLike
      ? await supabase.from("likes").delete().eq("id", existingLike.id)
      : await supabase.from("likes").insert({
          user_id: userId,
          post_id: postId,
        });

    if (error) {
      const action = existingLike ? "취소" : "추가";
      console.error(`Error like ${action}:`, error);
      return { error: `좋아요 ${action} 중 오류가 발생했습니다.` };
    }

    if (post?.type) {
      revalidatePath(`/${post.type}s/${postId}`);
    }

    return { isLiked: !existingLike };
  } catch (error) {
    console.error("Error toggling post like:", error);
    return { error: "좋아요 처리 중 오류가 발생했습니다." };
  }
}

/**
 * 게시물 생성 함수
 *
 * @param {FormData} formData - 폼 데이터
 * @param {Object} option - 게시물 생성 시 사용할 수 있는 옵션
 * @param {NotifyChannel[]} [option.notifyChannels=[]] - 알림을 전송할 채널 목록
 * @returns 생성된 게시물의 ID나 에러 메시지
 */
export async function createPost(
  formData: FormData,
  option: {
    notifyChannels: NotifyChannel[];
  } = { notifyChannels: [] },
) {
  const user = await getUserFromSupabase();

  if (!user) {
    return { error: "로그인이 필요합니다." };
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const postType = formData.get("postType") as PostType;
  const category = formData.get("category") as string;
  const tagsString = formData.get("tags") as string;
  const thumbnailUrl = formData.get("thumbnail_url") as string;

  // 태그 처리
  const tags = tagsString ? JSON.parse(tagsString) : [];

  // 유효성 검사
  if (!title || title.length < 5 || title.length > 200) {
    return { error: "제목은 5자 이상 200자 이하여야 합니다." };
  }
  if (!content || content.length < 10) {
    return { error: "내용은 10자 이상이어야 합니다." };
  }

  // 생성 후 페이지로 이동을 위한 id 저장 목적
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let createdPost: any;

  try {
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
      case "article":
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

    createdPost = data;

    notifyPost(option.notifyChannels, {
      ...basePost,
      postId: createdPost.id,
    }).catch(noop);

    if (data.author_id) {
      await grantPointAction(data.author_id, "post");
    }
    // 캐시 무효화
    revalidatePath("/");
  } catch (error) {
    console.error("Error creating post:", error);
    return { error: "포스트 생성 중 오류가 발생했습니다." };
  }
  redirect(`/${postType}s/${createdPost.id}`);
}

export async function getPostType(postId: string) {
  const supabase = await getSupabaseServerClient();

  const { data: post, error } = await supabase
    .from("posts")
    .select("type, author_id")
    .eq("id", postId)
    .single();

  if (error) {
    throw error;
  }

  return {
    type: post.type,
    authorId: post.author_id,
  };
}

/**
 * 게시물 삭제 함수
 *
 * @param postId 게시물 ID
 * @returns 성공 여부와 오류 정보
 */
export async function deletePost(postId: string, postType: PostType) {
  const supabase = await getSupabaseServerClient();
  const user = await getUserFromSupabase();

  if (!user) {
    return { error: "로그인이 필요합니다." };
  }

  try {
    // 삭제 실행
    const { error } = await supabase.from("posts").delete().eq("id", postId);
    if (error) throw error;
  } catch (error) {
    console.error("Error deleting post:", error);
    return { error: "게시물 삭제 중 오류가 발생했습니다." };
  }

  // 일반적으로 쓰는 스타일
  const newPath = match(postType)
    .with("question", () => COMMUNITY_QUESTIONS_PATHNAME)
    .with("discussion", () => COMMUNITY_DISCUSSIONS_PATHNAME)
    .with("article", () => COMMUNITY_ARTICLES_PATHNAME)
    .exhaustive();

  revalidatePath(newPath);
  redirect(newPath);
}

/**
 * 게시물 수정 함수
 *
 * @param {string} postId 수정할 게시물 ID
 * @param {FormData} formData 폼 데이터
 * @returns 성공 여부와 오류 정보
 */
export async function updatePost(postId: string, formData: FormData) {
  const user = await getUserFromSupabase();

  if (!user) {
    return { error: "로그인이 필요합니다." };
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const category = formData.get("category") as string;
  const tagsString = formData.get("tags") as string;
  const thumbnailUrl = formData.get("thumbnail_url") as string;

  // 태그 처리
  const tags = tagsString ? JSON.parse(tagsString) : [];

  // 유효성 검사
  if (!title || title.length < 5 || title.length > 200) {
    return { error: "제목은 5자 이상 200자 이하여야 합니다." };
  }
  if (!content || content.length < 10) {
    return { error: "내용은 10자 이상이어야 합니다." };
  }

  try {
    const supabase = await getSupabaseServerClient();

    // 게시물 권한 확인
    const { data: post, error: fetchError } = await supabase
      .from("posts")
      .select("author_id, type")
      .eq("id", postId)
      .single();

    if (fetchError) throw fetchError;

    if (!post || post.author_id !== user.id) {
      return { error: "수정 권한이 없습니다." };
    }

    // 게시물 기본 데이터
    const baseUpdate = {
      title,
      content,
    };

    // 게시물 유형별 추가 데이터
    let finalUpdate;
    switch (post.type) {
      case "discussion":
        finalUpdate = {
          ...baseUpdate,
          category: category || "",
          tags,
        };
        break;
      case "question":
        finalUpdate = {
          ...baseUpdate,
          category: category || "",
        };
        break;
      case "article":
        finalUpdate = {
          ...baseUpdate,
          thumbnail_url: thumbnailUrl || null,
        };
        break;
      default:
        finalUpdate = baseUpdate;
    }

    const { error } = await supabase
      .from("posts")
      .update(finalUpdate)
      .eq("id", postId);

    if (error) throw error;

    // 캐시 무효화
    revalidatePath(`/${post.type}s/${postId}`);

    return { success: true, postId, type: post.type };
  } catch (error) {
    console.error("Error updating post:", error);
    return { error: "게시물 수정 중 오류가 발생했습니다." };
  }
}
