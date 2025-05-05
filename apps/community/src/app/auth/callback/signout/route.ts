import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { MAIN_PATHNAME, SIGN_IN_PATHNAME } from "@/src/shared/config/pathname";
import { getSupabaseServerClient } from "@/src/shared/supabase/server";

export async function POST() {
  const supabase = await getSupabaseServerClient();
  await supabase.auth.signOut();
  console.log("signout");
  revalidatePath(MAIN_PATHNAME);
  redirect(SIGN_IN_PATHNAME);
}
