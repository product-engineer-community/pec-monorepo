import { PostType } from "@pec/shared";
import { notFound } from "next/navigation";

import { getPostById } from "@/src/features/post/api";
import PostForm from "@/widgets/PostForm";

interface EditPostPageProps {
  params: {
    id: string;
  };
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = params;
  const post = await getPostById(id);

  // 게시물이 없는 경우 404 페이지
  if (!post) {
    notFound();
  }

  // PostForm에 전달할 기본값 구성
  const defaultValues = {
    id: post.id,
    title: post.title,
    content: post.content,
    type: post.type as PostType, // PostType과 호환되도록 타입 변환
    category: post.category || undefined,
    tags: post.tags || [],
    thumbnail_url: post.thumbnail_url || undefined,
  };

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold">게시물 수정</h1>
      <PostForm defaultValues={defaultValues} isEdit />
    </div>
  );
}
