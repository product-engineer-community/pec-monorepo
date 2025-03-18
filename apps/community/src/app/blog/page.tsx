"use client";

import { Button, Text } from "@pec/shared";
import { CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Fake blog data
const FEATURED_POST = {
  id: 1,
  title: "프론트엔드 아키텍처의 미래: 마이크로 프론트엔드와 모듈 페더레이션",
  excerpt:
    "최근 대규모 프론트엔드 애플리케이션에서 주목받고 있는 마이크로 프론트엔드 아키텍처와 Webpack Module Federation의 실제 적용 사례와 장단점을 살펴봅니다.",
  author: {
    name: "김프로덕트",
    avatar: "/placeholder.svg",
  },
  publishedAt: "2024-04-01",
  readingTime: "15 min read",
  image: "/placeholder.svg",
  tags: ["아키텍처", "프론트엔드", "웹팩"],
};

const BLOG_POSTS = [
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
  },
];

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {/* Header */}
      <div className="mb-16 text-center">
        <Text size="3xl" weight="bold" className="mb-4">
          Product Engineer Blog
        </Text>
        <Text size="lg" className="text-muted-foreground">
          기술과 비즈니스의 균형을 찾는 프로덕트 엔지니어들의 이야기
        </Text>
      </div>

      {/* Featured Post */}
      <div className="mb-16">
        <Link href={`/blog/${FEATURED_POST.id}`}>
          <div className="group cursor-pointer space-y-4">
            <div className="aspect-[2/1] overflow-hidden rounded-xl">
              <Image
                src={FEATURED_POST.image}
                alt={FEATURED_POST.title}
                width={800}
                height={400}
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Image
                  src={FEATURED_POST.author.avatar}
                  alt={FEATURED_POST.author.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <Text weight="medium">{FEATURED_POST.author.name}</Text>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="h-4 w-4" />
                    <span>
                      {new Date(FEATURED_POST.publishedAt).toLocaleDateString(
                        "ko-KR",
                      )}
                    </span>
                    <span>•</span>
                    <span>{FEATURED_POST.readingTime}</span>
                  </div>
                </div>
              </div>
              <div>
                <Text
                  size="2xl"
                  weight="bold"
                  className="mb-2 group-hover:text-primary"
                >
                  {FEATURED_POST.title}
                </Text>
                <Text className="text-muted-foreground">
                  {FEATURED_POST.excerpt}
                </Text>
              </div>
              <div className="flex gap-2">
                {FEATURED_POST.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-secondary px-3 py-1 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Post List */}
      <div className="divide-y">
        {BLOG_POSTS.map((post) => (
          <Link key={post.id} href={`/blog/${post.id}`}>
            <div className="group cursor-pointer py-8">
              <div className="mb-3 flex items-center gap-3">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div>
                  <Text weight="medium">{post.author.name}</Text>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="h-4 w-4" />
                    <span>
                      {new Date(post.publishedAt).toLocaleDateString("ko-KR")}
                    </span>
                    <span>•</span>
                    <span>{post.readingTime}</span>
                  </div>
                </div>
              </div>
              <Text
                size="xl"
                weight="bold"
                className="mb-2 group-hover:text-primary"
              >
                {post.title}
              </Text>
              <Text className="mb-4 text-muted-foreground">{post.excerpt}</Text>
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-secondary px-3 py-1 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
