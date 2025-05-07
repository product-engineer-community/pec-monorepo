import { getSupabaseAdmin } from "@packages/supabase";
import { cookies } from "next/headers";

export async function getSupabaseAdminClient() {
  const cookieStore = await cookies();
  return getSupabaseAdmin(cookieStore);
}
