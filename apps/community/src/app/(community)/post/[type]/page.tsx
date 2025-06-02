import {
  getPostTypeDisplayName,
  getPostTypePathname,
} from "@packages/constants";
import { PostType, postType as postTypeSchema } from "@packages/ui";
import type { Metadata } from "next";

import { getPostTypeDescription } from "@/src/shared/constant/post";
import { PostHeader, PostList } from "@/widgets/post";

interface PostListPageProps {
  params: Promise<{
    type: Exclude<PostType, "article">;
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: PostListPageProps): Promise<Metadata> {
  const { type } = await params;

  const postTypeDisplayName = getPostTypeDisplayName(type);

  if (!(type in postTypeSchema.Enum)) {
    return {
      title: `${postTypeDisplayName} 페이지를 찾을 수 없습니다`,
      description: `요청하신 ${postTypeDisplayName} 페이지를 찾을 수 없습니다.`,
    };
  }

  const postTypePath = getPostTypePathname(type);

  return {
    title: `${postTypeDisplayName} 페이지`,
    description: getPostTypeDescription(type),
    openGraph: {
      title: `${postTypeDisplayName} 페이지`,
      description: getPostTypeDescription(type),
      type: "article",
      url: `${process.env.NEXT_PUBLIC_APP_URL}/${postTypePath}`,
      images: ["/logo.webp"],
    },
  };
}

export default async function PostListPage({ params }: PostListPageProps) {
  const { type } = await params;

  const postTypeDisplayName = getPostTypeDisplayName(type);
  const postTypePath = getPostTypePathname(type);

  return (
    <div className="container py-6">
      <PostHeader
        title={postTypeDisplayName}
        description={getPostTypeDescription(type)}
        postTypeForWriteButton={type}
      />
      <PostList postTypeToFetch={type} basePath={postTypePath} />
    </div>
  );
}
