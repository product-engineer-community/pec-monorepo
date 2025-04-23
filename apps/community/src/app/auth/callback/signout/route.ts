import { NextResponse } from "next/server";

import { SIGN_IN_PATHNAME } from "@/src/shared/config/pathname";
import { getSupabaseServerClient } from "@/src/shared/supabase/server";

export async function POST() {
  const supabase = await getSupabaseServerClient();
  await supabase.auth.signOut();
  return NextResponse.redirect(SIGN_IN_PATHNAME);
}
