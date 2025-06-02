import {
  COMMUNITY_ARTICLES_PATHNAME,
  COMMUNITY_LANDING_PATHNAME,
  COMMUNITY_PRODUCTIVITY_PATHNAME,
} from "@packages/constants";
import {
  ArrowLeft,
  BookOpen,
  Brain,
  Clock,
  Code2,
  Eye,
  FileText,
  GraduationCap,
  HelpCircle,
  Lightbulb,
  MessageCircle,
  MessageSquare,
  MoreHorizontal,
  Rocket,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import {
  getPostCategoryDescription,
  getPostTypeDescription,
} from "@/shared/constant/post";

export const metadata: Metadata = {
  title: "커뮤니티 가이드 | PEC 커뮤니티",
  description:
    "PEC 커뮤니티 이용 가이드입니다. 플랫폼 기능, 규칙, 그리고 커뮤니티를 최대한 활용하는 방법에 대해 알아보세요.",
  openGraph: {
    title: "커뮤니티 가이드 | PEC 커뮤니티",
    description:
      "PEC 커뮤니티 이용 가이드입니다. 플랫폼 기능, 규칙, 그리고 커뮤니티를 최대한 활용하는 방법에 대해 알아보세요.",
    images: ["/logo.webp"],
    type: "article",
  },
};

const postTypeIcons = {
  article: BookOpen,
  nextjs: Code2,
  FSD: Brain,
  codereview: Eye,
  productivity: Lightbulb,
  AI: Brain,
  sideproject: Rocket,
  learning: GraduationCap,
};

const categoryIcons = {
  question: HelpCircle,
  discussion: MessageCircle,
  retrospective: Clock,
  introduction: Users,
  guide: FileText,
  etc: MoreHorizontal,
};

export default function GuidePage() {
  const postTypes = [
    "article",
    "nextjs",
    "FSD",
    "codereview",
    "productivity",
    "AI",
    "sideproject",
    "learning",
  ] as const;

  const categories = [
    "question",
    "discussion",
    "retrospective",
    "introduction",
    "guide",
    "etc",
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link
            href={COMMUNITY_LANDING_PATHNAME}
            className="inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            커뮤니티 홈으로 돌아가기
          </Link>
        </div>

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            P.E.C 커뮤니티 가이드
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            Product Engineer Community에 오신 것을 환영합니다!
            <br />
            효과적인 커뮤니티 활용 방법과 다양한 주제들을 안내해드립니다.
          </p>
        </div>

        {/* Quick Start Guide */}
        <div className="mb-16 grid gap-8 md:grid-cols-2">
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="mb-4">
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-full bg-blue-100 p-2">
                  <MessageSquare className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  처음 방문하셨다면
                </h2>
              </div>
              <p className="mb-4 text-gray-600">
                커뮤니티에 첫 발을 내딛으셨네요! 다른 멤버들의 다양한 질문과
                답변을 통해 커뮤니티의 분위기를 먼저 파악해보세요.
              </p>
              <div className="rounded-md border bg-blue-50 p-4">
                <h3 className="mb-2 font-semibold text-blue-900">추천 활동</h3>
                <ul className="mb-3 space-y-1 text-sm text-blue-700">
                  <li>• Next.js, FSD 등 기술적 질문들 둘러보기</li>
                  <li>• 관심 있는 질문에 답변 달아보기</li>
                  <li>• 생산성 도구나 AI 활용 팁 확인하기</li>
                </ul>
                <Link
                  href={COMMUNITY_PRODUCTIVITY_PATHNAME}
                  className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 transition-colors hover:text-blue-800"
                >
                  Community 바로가기 →
                </Link>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="mb-4">
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-full bg-green-100 p-2">
                  <BookOpen className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  커뮤니티 취지가 궁금하다면
                </h2>
              </div>
              <p className="mb-4 text-gray-600">
                P.E.C가 추구하는 가치와 방향성을 이해하고 싶으시다면, 먼저
                아티클을 통해 커뮤니티의 철학을 알아보세요.
              </p>
              <div className="rounded-md border bg-green-50 p-4">
                <h3 className="mb-2 font-semibold text-green-900">추천 활동</h3>
                <ul className="mb-3 space-y-1 text-sm text-green-700">
                  <li>• 커뮤니티 철학과 가치 이해하기</li>
                  <li>• 창립 멤버들의 경험 공유 글 읽기</li>
                  <li>• 가이드와 모범 사례 학습하기</li>
                </ul>
                <Link
                  href={COMMUNITY_ARTICLES_PATHNAME}
                  className="inline-flex items-center gap-1 text-sm font-medium text-green-700 transition-colors hover:text-green-800"
                >
                  Articles 바로가기 →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Post Types Section */}
        <div className="mb-16">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              글 주제별 가이드
            </h2>
            <p className="text-gray-600">
              각 주제별로 어떤 내용을 다루는지 확인하고, 적합한 섹션에서
              소통해보세요.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {postTypes.map((type) => {
              const Icon = postTypeIcons[type];
              return (
                <div
                  key={type}
                  className="rounded-lg border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-full bg-blue-100 p-2">
                      <Icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold capitalize text-gray-900">
                      {type === "FSD"
                        ? "FSD"
                        : type === "AI"
                          ? "AI"
                          : type === "nextjs"
                            ? "Next.js"
                            : type}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {getPostTypeDescription(type)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Categories Section */}
        <div className="mb-16">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              글 유형별 가이드
            </h2>
            <p className="text-gray-600">
              목적에 맞는 글 유형을 선택해서 더 효과적으로 소통해보세요.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {categories.map((category) => {
              const Icon = categoryIcons[category];
              const categoryLabels = {
                question: "질문",
                discussion: "토론",
                retrospective: "회고",
                introduction: "소개",
                guide: "가이드",
                etc: "기타",
              };

              return (
                <div
                  key={category}
                  className="rounded-lg border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-full bg-green-100 p-2">
                      <Icon className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {categoryLabels[category]}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {getPostCategoryDescription(category)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Community Tips */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
            커뮤니티 활용 팁
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border bg-white p-6 text-center shadow-sm">
              <div className="mb-4 text-4xl">💡</div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                구체적으로 질문하기
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                &quot;Next.js에서 서버 액션 사용 시 에러 핸들링은 어떻게
                하나요?&quot;처럼 구체적인 상황과 함께 질문해보세요.
              </p>
            </div>
            <div className="rounded-lg border bg-white p-6 text-center shadow-sm">
              <div className="mb-4 text-4xl">🤝</div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                경험 공유하기
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                실제 프로젝트에서 겪은 문제와 해결 과정을 회고 형태로 공유하면
                모두에게 도움이 됩니다.
              </p>
            </div>
            <div className="rounded-lg border bg-white p-6 text-center shadow-sm">
              <div className="mb-4 text-4xl">📚</div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                코드와 함께 설명하기
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                코드리뷰나 기술 토론 시 실제 코드 예시를 포함하면 더 정확하고
                유용한 피드백을 받을 수 있어요.
              </p>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="mb-16 rounded-lg bg-gradient-to-r from-blue-50 to-green-50 p-8">
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
            좋은 글 작성 가이드
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-3 text-lg font-semibold text-green-900">
                ✅ 추천하는 방법
              </h3>
              <ul className="space-y-2 text-sm text-green-800">
                <li>• 명확한 제목으로 내용을 요약하기</li>
                <li>• 문제 상황과 시도한 방법 설명하기</li>
                <li>• 관련 코드나 스크린샷 첨부하기</li>
                <li>• 적절한 주제와 유형 태그 선택하기</li>
                <li>• 답변받으면 결과 공유하기</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-lg font-semibold text-red-900">
                ❌ 피해야 할 방법
              </h3>
              <ul className="space-y-2 text-sm text-red-800">
                <li>• &quot;급해요&quot;, &quot;도와주세요&quot;만 적기</li>
                <li>• 에러 메시지 없이 &quot;안 돼요&quot; 표현</li>
                <li>• 과도하게 긴 코드 덤핑</li>
                <li>• 관련 없는 주제에 글 올리기</li>
                <li>• 답변자에게 추가 설명 요구만 하기</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="rounded-lg bg-gradient-to-r from-blue-500 to-green-500 p-8 text-center text-white">
          <h2 className="mb-4 text-2xl font-bold">
            이제 P.E.C 커뮤니티를 시작해보세요!
          </h2>
          <p className="mb-6 text-blue-100">
            함께 성장하는 Product Engineer들과 소통하며 더 나은 개발자로
            성장해보세요.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href={COMMUNITY_PRODUCTIVITY_PATHNAME}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition-all hover:bg-gray-100"
            >
              질문하러 가기
            </Link>
            <Link
              href={COMMUNITY_ARTICLES_PATHNAME}
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white px-6 py-3 font-semibold text-white transition-all hover:bg-white hover:text-blue-600"
            >
              아티클 둘러보기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
