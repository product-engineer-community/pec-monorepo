import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@pec/shared";
import { type PostType } from "@pec/shared";
import { getSupabaseClient } from "@pec/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { useAuth } from "@/hooks/use-auth";
import { usePostType } from "@/hooks/use-post-type";
import { Editor } from "@/shared/components/editor";

const createBaseSchema = z.object({
  title: z.string().min(5).max(200),
  content: z.string().min(10),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  thumbnail_url: z.string().nullish(),
});

type FormData = z.infer<typeof createBaseSchema>;

export default function QuestionAndDiscussionForm() {
  const router = useRouter();
  const initialType = usePostType();
  const [postType, setPostType] = useState<PostType>(initialType);
  const { session } = useAuth();
  const supabase = getSupabaseClient();

  useEffect(() => {
    if (!session) {
      toast.error("로그인이 필요합니다.");
      router.replace("/auth/signin");
    }
  }, [session, router]);

  const { register, handleSubmit, watch, setValue, control } =
    useForm<FormData>({
      resolver: zodResolver(createBaseSchema),
      defaultValues: {
        title: "",
        content: "",
        category: "",
        tags: [],
        thumbnail_url: null,
      },
    });

  const tags = watch("tags") || [];

  const onSubmit = async (data: FormData) => {
    if (!session) {
      toast.error("로그인이 필요합니다.");
      router.replace("/auth/signin");
      return;
    }

    const basePost = {
      ...data,
      type: postType,
      author_id: session.user.id,
    };

    let finalPost;
    switch (postType) {
      case "discussion":
        finalPost = {
          ...basePost,
          category: data.category || "",
          tags: tags,
        };
        break;
      case "question":
        finalPost = {
          ...basePost,
          category: data.category || "",
          solved: false,
          answer_id: null,
        };
        break;
      case "post":
        finalPost = {
          ...basePost,
          thumbnail_url: data.thumbnail_url || null,
        };
        break;
    }

    try {
      const { error } = await supabase.from("posts").insert(finalPost);

      if (error) throw error;

      toast.success("Post created successfully!");
      router.push("/community");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim()) {
      e.preventDefault();
      const newTag = e.currentTarget.value.trim();
      setValue("tags", Array.from(new Set([...tags, newTag])));
      e.currentTarget.value = "";
    }
  };

  const removeTag = (tag: string) => {
    setValue(
      "tags",
      tags.filter((t) => t !== tag),
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex gap-4">
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
          variant={postType === "question" ? "default" : "outline"}
          onClick={() => setPostType("question")}
          className="capitalize"
        >
          question
        </Button>
        <Button
          type="button"
          variant={postType === "post" ? "default" : "outline"}
          onClick={() => setPostType("post")}
          className="capitalize"
        >
          post
        </Button>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Title</label>
        <Input {...register("title")} placeholder="Enter title" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Content</label>
        <div className="min-h-[400px] rounded-md border p-4">
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <Editor content={field.value} onChange={field.onChange} />
            )}
          />
        </div>
      </div>

      {postType !== "post" && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <Input {...register("category")} placeholder="Enter category" />
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
            onKeyDown={handleAddTag}
            placeholder="Add tags (press Enter)"
          />
        </div>
      )}

      {postType === "post" && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Thumbnail URL</label>
          <Input
            {...register("thumbnail_url")}
            placeholder="Enter thumbnail URL"
          />
        </div>
      )}

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit">Create</Button>
      </div>
    </form>
  );
}
