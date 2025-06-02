import { COMMUNITY_PRODUCTIVITY_PATHNAME } from "@packages/constants";
import { postType as postTypeSchema } from "@packages/ui";
import type { Metadata } from "next";

import { PostHeader, PostList } from "@/widgets/post";

export const metadata: Metadata = {
  title: "Productivity",
  description:
    "Discuss productivity techniques, tools, and workflows. Share tips, ask questions, and improve together.", // Updated description
  openGraph: {
    title: "Productivity | PEC 커뮤니티",
    description:
      "Discuss productivity techniques, tools, and workflows. Share tips, ask questions, and improve together.", // Updated description
    images: ["/logo.webp"],
    type: "website",
  },
};

export default async function ProductivityPage() {
  return (
    <div className="container py-6">
      <PostHeader
        title="Productivity"
        description="Discuss productivity techniques, tools, and workflows."
        postTypeForWriteButton={postTypeSchema.Enum.productivity}
      />
      <PostList
        postTypeToFetch={postTypeSchema.Enum.productivity}
        basePath={COMMUNITY_PRODUCTIVITY_PATHNAME}
      />
    </div>
  );
}
