"use client";

import {
  COMMUNITY_ARTICLES_PATHNAME,
  COMMUNITY_PRODUCTIVITY_PATHNAME,
} from "@packages/constants";
import { BookOpen, MessageCircleQuestionIcon, X } from "lucide-react";
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
    <div className="animate-in slide-in-from-bottom-4 fixed bottom-6 right-6 z-50 w-80">
      {/* Modal Content */}
      <div className="rounded-lg border bg-white p-6 shadow-xl">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-2 top-2 rounded-sm text-gray-400 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="mb-4 pr-6 text-center">
          <h2 className="text-lg font-bold text-gray-900">
            P.E.C 커뮤니티 가이드
          </h2>
          <p className="mt-1 text-xs text-gray-600">
            Product Engineer Community에 오신 것을 환영합니다 🎉
          </p>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div className="rounded-md border bg-blue-50 p-3">
            <Link href={COMMUNITY_PRODUCTIVITY_PATHNAME}>
              <div className="flex items-start gap-2">
                <MessageCircleQuestionIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600" />
                <div>
                  <h3 className="text-sm font-semibold text-blue-900">
                    처음 방문 하셨다면
                  </h3>
                  <p className="mt-1 text-xs text-blue-700">
                    <strong>Community</strong> 에서 질문을 읽어보세요.
                  </p>
                </div>
              </div>
            </Link>
          </div>

          <div className="rounded-md border bg-green-50 p-3">
            <Link href={COMMUNITY_ARTICLES_PATHNAME}>
              <div className="flex items-start gap-2">
                <BookOpen className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                <div>
                  <h3 className="text-sm font-semibold text-green-900">
                    커뮤니티 취지가 궁금하다면
                  </h3>
                  <p className="mt-1 text-xs text-green-700">
                    <strong>Articles</strong> 부터 읽어보세요.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
