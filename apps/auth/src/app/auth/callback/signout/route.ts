import { MAIN_PATHNAME, SIGN_IN_PATHNAME } from "@packages/constants";
import { getSupabaseServerClient } from "@packages/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function POST() {
  const supabase = await getSupabaseServerClient();
  await supabase.auth.signOut();
  revalidatePath(MAIN_PATHNAME);
  redirect(SIGN_IN_PATHNAME);
}
