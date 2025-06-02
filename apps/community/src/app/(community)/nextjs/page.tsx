import { COMMUNITY_NEXTJS_PATHNAME } from "@packages/constants";
import { postType as postTypeSchema } from "@packages/ui";
import type { Metadata } from "next";

import { PostHeader, PostList } from "@/widgets/post";

export const metadata: Metadata = {
  title: "Next.js",
  description:
    "All about Next.js: questions, discussions, and showcases.", // Standardized description
  openGraph: {
    title: "Next.js | PEC 커뮤니티",
    description:
      "All about Next.js: questions, discussions, and showcases.", // Standardized description
    images: ["/logo.webp"],
    type: "website",
  },
};

export default async function NextjsPage() {
  return (
    <div className="container py-6">
      <PostHeader
        title="Next.js"
        description="All about Next.js: questions, discussions, and showcases."
        postTypeForWriteButton={postTypeSchema.Enum.nextjs}
      />
      <PostList
        postTypeToFetch={postTypeSchema.Enum.nextjs}
        basePath={COMMUNITY_NEXTJS_PATHNAME}
      />
    </div>
  );
}
