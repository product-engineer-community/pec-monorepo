import fs from "fs";
import path from "path";

import type { Article } from "../model";

// 마크다운 파일의 메타데이터 추출 함수
function extractMetadata(content: string, filename: string): Article {
  // 기본 정보 설정
  const article: Article = {
    slug: filename.replace(".md", ""),
    content,
    title: "",
    publishedDate: new Date().toLocaleDateString("ko-KR"),
    author: "",
  };

  // 제목 추출 (첫 번째 # 으로 시작하는 줄)
  const titleMatch = content.match(/^#\s+(.+)$/m);
  if (titleMatch && titleMatch[1]) {
    article.title = titleMatch[1].trim();
  }

  // 내용 중 첫 번째 단락을 excerpt로 사용
  const excerptLines = content.split("\n\n");
  if (excerptLines.length > 1) {
    // 첫 번째 헤더가 아닌 단락을 찾음
    for (let i = 0; i < excerptLines.length; i++) {
      if (!excerptLines[i].startsWith("#")) {
        article.excerpt = excerptLines[i].trim();
        break;
      }
    }
  }

  return article;
}

export async function getArticles(slug: string) {
  try {
    // 마크다운 파일 경로 설정
    const filePath = path.join(
      process.cwd(),
      "public",
      "articles",
      `${slug}.md`,
    );

    // 파일 읽기
    const fileContent = fs.readFileSync(filePath, "utf8");

    return fileContent;
  } catch (error) {
    console.error("마크다운 파일을 읽는 중 오류 발생:", error);
    return "";
  }
}

export async function getAllArticles(): Promise<Article[]> {
  try {
    const articlesDir = path.join(process.cwd(), "public", "articles");
    const files = fs.readdirSync(articlesDir);

    const markdownFiles = files.filter((file) => file.endsWith(".md"));

    const articles = markdownFiles.map((file) => {
      const content = fs.readFileSync(path.join(articlesDir, file), "utf8");
      return extractMetadata(content, file);
    });

    return articles;
  } catch (error) {
    console.error("마크다운 파일 목록을 읽는 중 오류 발생:", error);
    return [];
  }
}
