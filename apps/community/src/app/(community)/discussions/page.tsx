import type { Metadata } from "next";

import { DiscussionsHeader, DiscussionsList } from "@/entities/discussion";

export const metadata: Metadata = {
  title: "디스커션",
  description:
    "다양한 주제에 대한 디스커션에 참여하세요. 의견을 공유하고, 질문하며, 다른 회원들과 소통해보세요.",
  openGraph: {
    title: "디스커션 | PEC 커뮤니티",
    description:
      "다양한 주제에 대한 디스커션에 참여하세요. 의견을 공유하고, 질문하며, 다른 회원들과 소통해보세요.",
    images: ["/logo.webp"],
    type: "website",
  },
};

export default function DiscussionsPage() {
  return (
    <div className="container py-6">
      <DiscussionsHeader />
      <DiscussionsList />
    </div>
  );
}
