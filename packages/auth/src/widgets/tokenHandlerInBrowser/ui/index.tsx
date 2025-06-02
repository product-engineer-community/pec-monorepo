"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getSupabaseClient } from "@packages/supabase/src/client";

export function TokenHandlerInBrowser() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const supabase = getSupabaseClient({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  });

  useEffect(() => {
    const access_token = searchParams.get("sb-access-token");
    const refresh_token = searchParams.get("sb-refresh-token");

    if (!access_token || !refresh_token) return;

    supabase.auth.setSession({ access_token, refresh_token });

    // only delete access token and refresh token if they are in the search params with url object
    const url = new URL(window.location.href);
    if (access_token) {
      url.searchParams.delete("sb-access-token");
    }
    if (refresh_token) {
      url.searchParams.delete("sb-refresh-token");
    }
    // use replace instead of push
    window.location.replace(url.pathname + url.search);
  }, [pathname, searchParams]);

  return null;
}
