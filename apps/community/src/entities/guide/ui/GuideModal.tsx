"use client";

import {
  COMMUNITY_ARTICLES_PATHNAME,
  COMMUNITY_PRODUCTIVITY_PATHNAME,
} from "@packages/constants";
import {
  BookOpen,
  Code2,
  Lightbulb,
  MessageCircleQuestionIcon,
  Rocket,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

interface GuideModalProps {
  onClose?: () => void;
}

export default function GuidePage({ onClose }: GuideModalProps) {
  const router = useRouter();

  const handleClose = useCallback(() => {
    // localStorage에 가이드 모달이 열렸음을 저장
    localStorage.setItem("isGuideModalOpened", "true");

    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  }, [onClose, router]);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [handleClose]);

  return (
    <div className="animate-in slide-in-from-bottom-4 fixed bottom-6 right-6 z-50 w-96">
      {/* Modal Content */}
      <div className="rounded-lg border bg-white p-6 shadow-xl">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-3 top-3 rounded-sm text-gray-400 transition-colors hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="mb-5 pr-6">
          <h2 className="mb-2 text-xl font-bold text-gray-900">
            P.E.C 커뮤니티 가이드
          </h2>
          <p className="text-sm text-gray-600">
            Product Engineer Community에 오신 것을 환영합니다! 🎉
          </p>
        </div>

        {/* Quick Start Options */}
        <div className="mb-5 space-y-3">
          <div className="rounded-lg border bg-blue-50 p-4 transition-colors hover:bg-blue-100">
            <Link href={COMMUNITY_PRODUCTIVITY_PATHNAME} className="block">
              <div className="flex items-start gap-3">
                <MessageCircleQuestionIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                <div>
                  <h3 className="mb-1 text-sm font-semibold text-blue-900">
                    질문하고 답변받기
                  </h3>
                  <p className="text-xs leading-relaxed text-blue-700">
                    Next.js, FSD, 생산성 도구 등 구체적인 문제 해결부터
                    시작해보세요.
                  </p>
                </div>
              </div>
            </Link>
          </div>

          <div className="rounded-lg border bg-green-50 p-4 transition-colors hover:bg-green-100">
            <Link href={COMMUNITY_ARTICLES_PATHNAME} className="block">
              <div className="flex items-start gap-3">
                <BookOpen className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                <div>
                  <h3 className="mb-1 text-sm font-semibold text-green-900">
                    아티클 둘러보기
                  </h3>
                  <p className="text-xs leading-relaxed text-green-700">
                    커뮤니티의 철학과 다양한 경험 공유 글들을 확인해보세요.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Popular Topics */}
        <div className="border-t pt-4">
          <h4 className="mb-3 text-sm font-semibold text-gray-700">
            인기 주제들
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 rounded-md bg-gray-50 p-2">
              <Code2 className="h-3 w-3 text-gray-600" />
              <span className="text-xs text-gray-700">Next.js</span>
            </div>
            <div className="flex items-center gap-2 rounded-md bg-gray-50 p-2">
              <Lightbulb className="h-3 w-3 text-gray-600" />
              <span className="text-xs text-gray-700">생산성</span>
            </div>
            <div className="flex items-center gap-2 rounded-md bg-gray-50 p-2">
              <Users className="h-3 w-3 text-gray-600" />
              <span className="text-xs text-gray-700">코드리뷰</span>
            </div>
            <div className="flex items-center gap-2 rounded-md bg-gray-50 p-2">
              <Rocket className="h-3 w-3 text-gray-600" />
              <span className="text-xs text-gray-700">사이드프로젝트</span>
            </div>
          </div>
        </div>

        {/* Full Guide Link */}
        <div className="mt-4 border-t pt-4">
          <Link
            href="/guide"
            className="block text-center text-xs text-blue-600 transition-colors hover:text-blue-800"
          >
            상세 가이드 보기 →
          </Link>
        </div>
      </div>
    </div>
  );
}
