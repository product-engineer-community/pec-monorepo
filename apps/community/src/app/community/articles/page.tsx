"use client";

import { Text } from "@pec/shared";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

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

// Fake blog data
const FEATURED_POST = {
  id: "featured-1",
  title: "AI와 함께하는 프로덕트 디자인: 더 나은 사용자 경험을 위한 접근",
  description:
    "AI가 어떻게 프로덕트 디자인 프로세스를 혁신하고 있는지 알아보세요. 이 글에서는 AI 기술을 활용하여 사용자 경험을 향상시키는 방법과 실제 사례를 소개합니다.",
  author: "Jane Smith",
  date: "2023-02-15",
  category: "Product Design",
  readTime: "8 min read",
  coverImage: "/featured-post-cover.jpg",
  tags: ["AI", "UX Design", "Product Development"],
};

const ARTICLES_POSTS = [
  {
    id: 2,
    title: "Product Engineer가 알아야 할 비즈니스 메트릭",
    excerpt:
      "기술적 지표를 넘어 비즈니스 성과를 측정하고 개선하는 방법에 대해 알아봅니다.",
    author: {
      name: "이비즈",
      avatar: "/placeholder.svg",
    },
    publishedAt: "2024-03-28",
    readingTime: "10 min read",
    tags: ["비즈니스", "메트릭", "프로덕트"],
    coverImage: "/placeholder.svg",
    category: "비즈니스",
  },
  {
    id: 3,
    title: "Next.js 서버 컴포넌트로 성능 최적화하기",
    excerpt:
      "서버 컴포넌트를 활용한 실제 성능 최적화 사례와 구현 패턴을 공유합니다.",
    author: {
      name: "박엔지니어",
      avatar: "/placeholder.svg",
    },
    publishedAt: "2024-03-25",
    readingTime: "12 min read",
    tags: ["Next.js", "성능최적화", "React"],
    coverImage: "/placeholder.svg",
    category: "개발",
  },
  {
    id: 4,
    title: "AI 시대의 코드 리뷰 방법론",
    excerpt:
      "ChatGPT와 GitHub Copilot을 활용한 효율적인 코드 리뷰 프로세스를 소개합니다.",
    author: {
      name: "정AI",
      avatar: "/placeholder.svg",
    },
    publishedAt: "2024-03-22",
    readingTime: "8 min read",
    tags: ["AI", "코드리뷰", "생산성"],
    coverImage: "/placeholder.svg",
    category: "개발",
  },
];

export default function ArticlesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <Text size="3xl" weight="bold" className="mb-4">
          Product Engineer Articles
        </Text>
        <Text className="mx-auto max-w-2xl text-muted-foreground">
          기술의 본질을 이해하고 사용자의 문제를 해결하는 프로덕트 엔지니어들의
          인사이트와 경험을 공유합니다.
        </Text>
      </div>

      <div className="mb-16 overflow-hidden rounded-lg bg-muted shadow-lg">
        <div className="md:flex">
          <div className="md:w-2/3">
            <Link href={`/community/articles/${FEATURED_POST.id}`}>
              <div className="h-full w-full p-4 md:p-8">
                <div className="mb-2 flex flex-wrap gap-2">
                  <Badge>{FEATURED_POST.category}</Badge>
                  {FEATURED_POST.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h2 className="mb-4 text-2xl font-bold md:text-3xl">
                  {FEATURED_POST.title}
                </h2>
                <p className="mb-4 text-muted-foreground">
                  {FEATURED_POST.description}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                      <Image
                        src="/avatar-placeholder.png"
                        alt={FEATURED_POST.author}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-medium">
                        {FEATURED_POST.author}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {FEATURED_POST.date}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {FEATURED_POST.readTime}
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="hidden overflow-hidden bg-gray-100 md:block md:w-1/3">
            <div className="h-full w-full">
              <Image
                src={FEATURED_POST.coverImage}
                alt={FEATURED_POST.title}
                width={400}
                height={300}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

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
          {ARTICLES_POSTS.map((post) => (
            <Link key={post.id} href={`/community/articles/${post.id}`}>
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
                  <p className="line-clamp-3 text-sm text-muted-foreground">
                    {post.excerpt}
                  </p>
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
