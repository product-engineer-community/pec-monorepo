import { getSupabaseClient } from "@packages/supabase/src/client";

export function useAuth() {
  const supabase = getSupabaseClient({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  });
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
