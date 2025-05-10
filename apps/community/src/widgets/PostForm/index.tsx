"use client";

import { Button, Input } from "@packages/ui";
import { type PostType } from "@packages/ui";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

import { Editor } from "@/shared/components/editor";
import { convertPointTypeToToastMessage } from "@/src/entities/point/model";
import { createPost, updatePost } from "@/src/features/post/action";
import { usePostType } from "@/src/features/post/model/use-post-type";

// 초기 상태 정의
type FormState = {
  error?: string;
  success?: boolean;
  postId?: string;
  type?: string;
};

const initialState: FormState = {
  error: undefined,
  success: false,
  postId: undefined,
  type: undefined,
};

// 폼 기본값 타입
export interface PostFormDefaultValues {
  id?: string;
  title?: string;
  content?: string;
  type?: PostType;
  category?: string;
  tags?: string[];
  thumbnail_url?: string;
}

interface PostFormProps {
  defaultValues?: PostFormDefaultValues;
  isEdit?: boolean;
}

// 제출 버튼 컴포넌트
function SubmitButton({ isEdit }: { isEdit?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} isLoading={pending}>
      {isEdit ? "수정하기" : "생성하기"}
    </Button>
  );
}

export default function PostForm({
  defaultValues,
  isEdit = false,
}: PostFormProps) {
  const router = useRouter();
  const initialPostType = usePostType();
  const initialType = defaultValues?.type || initialPostType;
  const [postType, setPostType] = useState<PostType>(initialType);

  // 컨트롤된 상태 (content, tags만)
  const [content, setContent] = useState(defaultValues?.content || "");
  const [tags, setTags] = useState<string[]>(defaultValues?.tags || []);

  // 서버 액션을 폼에 맞게 수정하는 래퍼 함수
  const handleFormAction = async (prevState: FormState, formData: FormData) => {
    formData.set("content", content);
    formData.set("tags", JSON.stringify(tags));

    // 수정 모드일 경우 updatePost 호출
    if (isEdit && defaultValues?.id) {
      return updatePost(defaultValues.id, formData);
    }

    // 생성 모드일 경우 createPost 호출
    formData.set("postType", postType);
    return createPost(formData, { notifyChannels: ["discord"] });
  };

  // 서버 액션과 폼 상태 연결
  const [state, formAction] = useActionState<FormState, FormData>(
    handleFormAction,
    initialState,
  );

  // 서버 응답 처리
  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    } else if (state.success && state.postId && state.type) {
      toast.success(
        isEdit ? "게시물이 수정되었습니다." : "게시물이 생성되었습니다.",
      );

      // 수정 완료 후 상세 페이지로 이동
      if (isEdit) {
        router.push(`/community/${state.type}s/${state.postId}`);
        router.refresh();
      }
    }
    if (state.success) {
      toast.success(convertPointTypeToToastMessage("post"));
    }
  }, [state, router, isEdit]);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) {
      return;
    }

    const trimmedTag = e.currentTarget.value.trim();

    if (e.key === "Enter" && trimmedTag) {
      e.preventDefault();
      if (tags.includes(trimmedTag)) {
        toast.error("이미 추가된 태그입니다.");
        return;
      }

      setTags((prevTags) => [...prevTags, trimmedTag]);
      e.currentTarget.value = "";
    }
  };

  const removeTag = (tag: string) => {
    setTags((prevTags) => prevTags.filter((t) => t !== tag));
  };

  return (
    <form action={formAction} className="space-y-6">
      {!isEdit && (
        <div className="flex gap-4">
          <Button
            type="button"
            variant={postType === "question" ? "default" : "outline"}
            onClick={() => setPostType("question")}
            className="capitalize"
          >
            question
          </Button>
          <Button
            type="button"
            variant={postType === "discussion" ? "default" : "outline"}
            onClick={() => setPostType("discussion")}
            className="capitalize"
          >
            discussion
          </Button>
          <Button
            type="button"
            variant={postType === "article" ? "default" : "outline"}
            onClick={() => setPostType("article")}
            className="capitalize"
          >
            article
          </Button>
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium">글 제목</label>
        <Input
          name="title"
          placeholder="제목을 입력하세요"
          defaultValue={defaultValues?.title || ""}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">내용</label>
        <div className="min-h-[400px] rounded-md border p-4">
          <Editor content={content} onChange={setContent} />
        </div>
      </div>

      {postType !== "article" && (
        <div className="space-y-2">
          <label className="text-sm font-medium">카테고리</label>
          <Input
            name="category"
            placeholder="카테고리를 입력하세요"
            defaultValue={defaultValues?.category || ""}
          />
        </div>
      )}

      {postType === "discussion" && (
        <div className="space-y-2">
          <label className="text-sm font-medium">태그</label>
          <div className="mb-2 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <div
                key={tag}
                className="flex items-center gap-1 rounded-md bg-secondary px-2 py-1"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <Input
            name="tag-input"
            onKeyDown={handleAddTag}
            placeholder="작성후 엔터를 입력해 추가하세요"
          />
        </div>
      )}

      {postType === "article" && (
        <div className="space-y-2">
          <label className="text-sm font-medium">썸네일 URL</label>
          <Input
            name="thumbnail_url"
            placeholder="썸네일 URL을 입력하세요"
            defaultValue={defaultValues?.thumbnail_url || ""}
          />
        </div>
      )}

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          취소
        </Button>
        <SubmitButton isEdit={isEdit} />
      </div>
    </form>
  );
}
