import { getSupabaseServer } from "@pec/supabase";
import { cookies } from "next/headers";

export async function getSupabaseServerClient() {
  const cookieStore = await cookies();
  return getSupabaseServer(cookieStore);
}
