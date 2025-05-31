import { COMMUNITY_ARTICLES_PATHNAME } from "@packages/constants";
import { postType,Text } from "@packages/ui";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

import { getPosts } from "@/entities/post";
import { MarkdownViewer } from "@/src/shared/components/editor";

// Badge 컴포넌트 직접 구현
interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "outline";
  className?: string;
}

const Badge = ({
  children,
  variant = "default",
  className = "",
}: BadgeProps) => {
  const baseStyle =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";
  const variantStyles = {
    default: "bg-primary text-primary-foreground",
    outline: "border border-input bg-background text-foreground",
  };

  return (
    <span className={`${baseStyle} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};

export const metadata: Metadata = {
  title: "아티클",
  description:
    "PEC 커뮤니티의 다양한 아티클들을 살펴보세요. 새로운 관점을 발견하고, 유용한 지식을 얻으며, 당신의 경험을 공유해보세요.",
  openGraph: {
    title: "아티클 | PEC 커뮤니티",
    description:
      "PEC 커뮤니티의 다양한 아티클들을 살펴보세요. 새로운 관점을 발견하고, 유용한 지식을 얻으며, 당신의 경험을 공유해보세요.",
    images: ["/logo.webp"],
    type: "website",
  },
};

export default async function ArticlesPage() {
  // getPosts 함수를 사용하여 'article' 타입의 게시물을 가져옵니다
  const articles = await getPosts(postType.Enum.article);

  // 가공된 아티클 데이터 생성
  const articlesData = articles.map((article) => {
    return {
      id: article.id,
      title: article.title || `아티클`,
      excerpt: article.content || "아티클 요약이 없습니다.",
      author: {
        name: article.author?.username || "익명",
        avatar: article.author?.avatar_url || "/community/default-avatar.svg",
      },
      publishedAt: new Date(article.created_at).toLocaleDateString("ko-KR"),
      readingTime: "8 min read",
      tags: article.tags || ["Product Engineer"],
      coverImage:
        article.thumbnail_url || "/community/default-article-thumbnail.svg",
      category: article.category || "기타",
    };
  });

  // 첫 번째 아티클을 featured 아티클로 사용
  const featuredArticle = articlesData[0];
  // 나머지 아티클은 목록에 표시
  const remainingArticles = articlesData.slice(1);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <Text size="3xl" weight="bold" className="mb-4">
          Product Engineer Articles
        </Text>
        <Text className="max-w-2xl">
          기술의 본질을 이해하고 사용자의 문제를 해결하는 Product Engineer들의
          인사이트와 경험을 공유합니다.
        </Text>
      </div>

      {featuredArticle && (
        <div className="mb-16 overflow-hidden rounded-lg bg-muted shadow-lg">
          <div className="md:flex">
            <div className="md:w-2/3">
              <Link
                href={`${COMMUNITY_ARTICLES_PATHNAME}/${featuredArticle.id}`}
              >
                <div className="h-full w-full p-4 md:p-8">
                  <div className="mb-2 flex flex-wrap gap-2">
                    <Badge>{featuredArticle.category}</Badge>
                    {featuredArticle.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h2 className="mb-4 text-2xl font-bold md:text-3xl">
                    {featuredArticle.title}
                  </h2>
                  <MarkdownViewer content={featuredArticle.excerpt} />
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                        <Image
                          src={featuredArticle.author.avatar}
                          alt={featuredArticle.author.name}
                          width={40}
                          height={40}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-sm font-medium">
                          {featuredArticle.author.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {featuredArticle.publishedAt}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {featuredArticle.readingTime}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="hidden overflow-hidden bg-gray-100 md:block md:w-1/3">
              <div className="h-full w-full">
                <Image
                  src={featuredArticle.coverImage}
                  alt={featuredArticle.title}
                  width={400}
                  height={300}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mb-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">최신 아티클</h2>
          <div className="w-[180px] rounded-md border border-input">
            <select className="w-full bg-transparent p-2 text-sm">
              <option value="latest">최신순</option>
              <option value="popular">인기순</option>
              <option value="comments">댓글순</option>
            </select>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {remainingArticles.map((post) => (
            <Link
              key={post.id}
              href={`${COMMUNITY_ARTICLES_PATHNAME}/${post.id}`}
            >
              <div className="h-full overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
                <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    width={400}
                    height={225}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Badge>{post.category}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(post.publishedAt).toLocaleDateString("ko-KR")}
                    </span>
                  </div>
                  <h3 className="mb-2 line-clamp-2 text-xl font-bold">
                    {post.title}
                  </h3>
                  <MarkdownViewer content={post.excerpt} />
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 overflow-hidden rounded-full bg-gray-200">
                        <Image
                          src={post.author.avatar}
                          alt={post.author.name}
                          width={24}
                          height={24}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="text-sm">{post.author.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {post.readingTime}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button className="rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent">
          더 많은 아티클 보기
        </button>
      </div>
    </div>
  );
}
