import { getSupabaseServerClient } from "./server";

export async function getAuthSession() {
  const supabase = await getSupabaseServerClient();
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function signOut() {
  const supabase = await getSupabaseServerClient();
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error("Error:", error);
  }
}
