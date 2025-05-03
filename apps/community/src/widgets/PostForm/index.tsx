import { Button, Input } from "@pec/shared";
import { type PostType } from "@pec/shared";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

import { Editor } from "@/shared/components/editor";
import { createPost } from "@/src/features/post/action";
import { usePostType } from "@/src/features/post/model/use-post-type";

// 초기 상태 정의
type FormState = {
  error?: string;
  success?: boolean;
  postId?: string;
};

const initialState: FormState = {
  error: undefined,
  success: false,
  postId: undefined,
};

// 제출 버튼 컴포넌트
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "생성 중..." : "생성하기"}
    </Button>
  );
}

export default function PostForm() {
  const router = useRouter();
  const initialType = usePostType();
  const [postType, setPostType] = useState<PostType>(initialType);

  // 폼 상태 및 ref

  // 컨트롤된 상태 (content, tags만)
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  // 서버 액션을 폼에 맞게 수정하는 래퍼 함수
  const createPostWithData = async (
    prevState: FormState,
    formData: FormData,
  ) => {
    formData.set("content", content);
    formData.set("tags", JSON.stringify(tags));
    formData.set("postType", postType);

    return createPost(formData, { notifyChannels: ["discord"] });
  };

  // 서버 액션과 폼 상태 연결
  const [state, formAction] = useActionState<FormState, FormData>(
    createPostWithData,
    initialState,
  );

  // 서버 응답 처리
  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
  }, [state]);

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

      <div className="space-y-2">
        <label className="text-sm font-medium">Title</label>
        <Input name="title" placeholder="Enter title" defaultValue="" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Content</label>
        <div className="min-h-[400px] rounded-md border p-4">
          <Editor content={content} onChange={setContent} />
        </div>
      </div>

      {postType !== "article" && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <Input name="category" placeholder="Enter category" defaultValue="" />
        </div>
      )}

      {postType === "discussion" && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Tags</label>
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
            placeholder="Add tags (press Enter)"
          />
        </div>
      )}

      {postType === "article" && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Thumbnail URL</label>
          <Input
            name="thumbnail_url"
            placeholder="Enter thumbnail URL"
            defaultValue=""
          />
        </div>
      )}

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          취소
        </Button>
        <SubmitButton />
      </div>
    </form>
  );
}
