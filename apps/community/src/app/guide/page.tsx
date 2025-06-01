import {
  COMMUNITY_ARTICLES_PATHNAME,
  COMMUNITY_LANDING_PATHNAME,
} from "@packages/constants";
import { ArrowLeft, BookOpen, MessageSquare } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

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

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-8">
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
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Product Engineer Community에 오신 것을 환영합니다!
            <br />
            효과적인 커뮤니티 활용 방법을 안내해드립니다.
          </p>
        </div>

        {/* Guide Content */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* 처음 방문자 가이드 */}
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
                  <li>
                    • <strong>Questions</strong> 섹션에서 다양한 질문 읽어보기
                  </li>
                  <li>• 관심 있는 질문에 답변 달아보기</li>
                  <li>• 다른 멤버들의 프로필 둘러보기</li>
                </ul>
                <Link
                  href={COMMUNITY_ARTICLES_PATHNAME}
                  className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 transition-colors hover:text-blue-800"
                >
                  Questions 바로가기 →
                </Link>
              </div>
            </div>
          </div>

          {/* 커뮤니티 취지 가이드 */}
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
                  <li>
                    • <strong>Articles</strong> 섹션부터 읽어보기
                  </li>
                  <li>• 창립 멤버들의 글 살펴보기</li>
                  <li>• 커뮤니티 규칙과 가이드라인 숙지하기</li>
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

        {/* Additional Tips */}
        <div className="mt-12">
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
            커뮤니티 활용 팁
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border bg-white p-4 text-center">
              <div className="mb-2 text-2xl">💡</div>
              <h3 className="mb-2 font-semibold text-gray-900">
                무엇이든 물어보기
              </h3>
              <p className="text-sm text-gray-600">
                질문은 성장의 지름길이에요. 떠오르는 대로 편하게 질문해보세요.
              </p>
            </div>
            <div className="rounded-lg border bg-white p-4 text-center">
              <div className="mb-2 text-2xl">🤝</div>
              <h3 className="mb-2 font-semibold text-gray-900">
                적극적으로 참여하기
              </h3>
              <p className="text-sm text-gray-600">
                답변, 댓글, 좋아요를 통해 활발한 소통에 참여해보세요.
              </p>
            </div>
            <div className="rounded-lg border bg-white p-4 text-center">
              <div className="mb-2 text-2xl">📚</div>
              <h3 className="mb-2 font-semibold text-gray-900">
                지식 공유하기
              </h3>
              <p className="text-sm text-gray-600">
                본인의 경험과 지식을 다른 멤버들과 공유해보세요.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 rounded-lg bg-gradient-to-r from-blue-500 to-green-500 p-8 text-center text-white">
          <h2 className="mb-4 text-2xl font-bold">
            이제 P.E.C 커뮤니티를 시작해보세요!
          </h2>
          <p className="mb-6 text-blue-100">
            함께 성장하는 Product Engineer들과 소통하며 더 나은 개발자로
            성장해보세요.
          </p>
          <Link
            href={COMMUNITY_LANDING_PATHNAME}
            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition-all hover:bg-gray-100"
          >
            커뮤니티 시작하기
          </Link>
        </div>
      </div>
    </div>
  );
}
