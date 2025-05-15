import { getOrigin } from "@packages/constants";
import { getSupabaseServerClient } from "@packages/supabase";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const next = searchParams.get("next");

    if (code) {
      const supabase = await getSupabaseServerClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error("exchangeCodeForSession error:", error);
        return NextResponse.json(
          { error: error.message || "Failed to exchange code for session" },
          { status: 400 },
        );
      }
    } else {
      console.error("No code provided in query");
      return NextResponse.json({ error: "No code provided" }, { status: 400 });
    }

    let redirectUrl = getOrigin();

    if (next) {
      try {
        const url = new URL(next);
        const allowedHosts = [
          "auth.productengineer.info",
          "community.productengineer.info",
          "camp.productengineer.info",
          "productengineer.info",
          "www.productengineer.info",
          "localhost",
        ];
        if (allowedHosts.includes(url.hostname)) {
          redirectUrl = next;
        }
      } catch (err: unknown) {
        console.warn("Invalid next URL:", next, err);
      }
    }

    return NextResponse.redirect(redirectUrl);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Unhandled error in /auth/callback", err);
    return NextResponse.json(
      { error: err?.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
