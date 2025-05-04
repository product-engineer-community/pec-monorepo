import { NextResponse } from "next/server";

import { getSupabaseServerClient } from "@/shared/supabase/server";

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const code = searchParams.get("code");
  const next = (searchParams.get("next") ?? "") + "/";

  if (code) {
    const supabase = await getSupabaseServerClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(new URL(next, request.url));
}
