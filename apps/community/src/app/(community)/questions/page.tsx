import type { Metadata } from "next";

import { QuestionsHeader, QuestionsList } from "@/entities/question";

export const metadata: Metadata = {
  title: "퀘스천 | PEC 커뮤니티",
  description:
    "PEC 커뮤니티에 질문하고 답변을 찾아보세요. 지식을 공유하고 다른 사람들의 문제 해결을 도와주세요.",
  openGraph: {
    title: "퀘스천 | PEC 커뮤니티",
    description:
      "PEC 커뮤니티에 질문하고 답변을 찾아보세요. 지식을 공유하고 다른 사람들의 문제 해결을 도와주세요.",
    images: ["/logo.webp"],
    type: "website",
  },
};

export default function QuestionsPage() {
  return (
    <div className="container py-6">
      <QuestionsHeader />
      <QuestionsList />
    </div>
  );
}
