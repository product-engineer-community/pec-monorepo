"use client";

import { getSupabaseClient } from "@packages/supabase/src/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (code) {
      const supabase = getSupabaseClient();

      supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
        if (error) {
          console.error("세션 교환 실패", error);
        } else {
          // 성공 시 홈 등으로 이동
          router.replace("/");
        }
      });
    }
  }, [router]);

  return <p>로그인 처리 중입니다...</p>;
}
