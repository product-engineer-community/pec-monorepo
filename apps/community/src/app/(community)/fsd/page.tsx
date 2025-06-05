import { COMMUNITY_FSD_PATHNAME } from "@packages/constants";
import { postType as postTypeSchema } from "@packages/ui";
import type { Metadata } from "next";

import { PostHeader, PostList } from "@/widgets/post";

export const metadata: Metadata = {
  title: "F.S.D",
  description:
    "Full Stack Development topics, from frontend to backend. Join the discussion!", // Standardized description
  openGraph: {
    title: "F.S.D | PEC 커뮤니티",
    description:
      "Full Stack Development topics, from frontend to backend. Join the discussion!", // Standardized description
    images: ["/logo.webp"],
    type: "website",
  },
};

export default async function FSDPage() {
  return (
    <div className="container py-6">
      <PostHeader
        title="F.S.D"
        description="Full Stack Development topics, from frontend to backend. Join the discussion!"
        postTypeForWriteButton={postTypeSchema.Enum.FSD}
      />
      <PostList
        postTypeToFetch={postTypeSchema.Enum.FSD}
        basePath={COMMUNITY_FSD_PATHNAME}
      />
    </div>
  );
}
