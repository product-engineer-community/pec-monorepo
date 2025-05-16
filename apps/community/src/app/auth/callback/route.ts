import { getSupabaseServerClient } from "@packages/supabase";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next");

  if (code) {
    const supabase = await getSupabaseServerClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  // 기본 리디렉션 경로
  const fallbackRedirect = "https://productengineer.info";

  // 보안: 허용된 호스트만 리디렉션 허용
  const allowedHosts = [
    "community.productengineer.info",
    "camp.productengineer.info",
    "productengineer.info",
  ];

  let redirectUrl = fallbackRedirect;

  if (next) {
    try {
      const url = new URL(next);
      if (allowedHosts.includes(url.hostname)) {
        redirectUrl = next;
      }
    } catch (err) {
      console.log("🚀 ~ GET ~ err:", err);
      // next 파라미터가 잘못된 형식이면 무시
      console.warn("Invalid next URL:", next);
    }
  }

  return NextResponse.redirect(redirectUrl);
}
