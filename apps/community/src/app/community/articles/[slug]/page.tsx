import type { Metadata } from "next";

import { getArticles } from "@/entities/articles";
import { ArticleDetailLayout } from "@/src/widgets/articleDetail";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// 마크다운 파일에서 메타데이터 추출 함수
function extractMetadata(content: string) {
  // 제목 추출 (첫 번째 # 으로 시작하는 줄)
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch && titleMatch[1] ? titleMatch[1].trim() : "";

  return {
    title,
  };
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = await getArticles(slug);
  const metadata = extractMetadata(content);

  return {
    title: metadata.title || `${slug}`,
    description: `${slug} 기사의 상세 내용입니다.`,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const content = await getArticles(slug);
  const metadata = extractMetadata(content);

  // 백업용 타이틀 (마크다운에서 추출한 제목이 없을 경우)
  const titles: Record<string, string> = {
    "1": "선한 영향, 그리고 Product Engineer의 길",
    "2": '"그거 왜 만들어요?"라는 질문에 답할 수 있어야 하더라고요',
  };

  const article = {
    slug,
    content,
    title: metadata.title || titles[slug] || `아티클 ${slug}`,
    publishedDate: new Date().toLocaleDateString(),
    author: "작성자",
  };

  return <ArticleDetailLayout article={article} />;
}
