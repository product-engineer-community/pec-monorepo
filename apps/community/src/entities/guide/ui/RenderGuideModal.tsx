"use client";

import { useAuth } from "@packages/auth/src/features";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RenderGuideModal() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // 인증된 사용자만 체크
    if (!isAuthenticated) return;

    // localStorage에서 가이드 모달 오픈 여부 확인
    const isGuideModalOpened = localStorage.getItem("isGuideModalOpened");

    // 가이드 모달이 열린 적이 없다면 모달 열기
    if (isGuideModalOpened !== "true") {
      router.push("/guide");
      localStorage.setItem("isGuideModalOpened", "true");
    }
  }, [isAuthenticated, router]);

  return null;
}
