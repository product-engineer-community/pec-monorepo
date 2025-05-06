import { getSupabaseClient } from "@pec/supabase";

export function useAuth() {
  const supabase = getSupabaseClient();
  const getSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return {
    getSession,
    signOut,
  };
}
