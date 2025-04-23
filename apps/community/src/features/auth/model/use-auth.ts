import { getSupabaseClient } from "@pec/supabase";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { SIGN_IN_PATHNAME } from "@/shared/config/pathname";

export function useAuth() {
  const queryClient = useQueryClient();
  const supabase = getSupabaseClient();

  const { data: session } = useQuery({
    queryKey: ["auth", "session"],
    queryFn: async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      return session;
    },
    refetchInterval: 1000 * 60 * 5,
  });

  const signOut = async () => {
    await supabase.auth.signOut();
    queryClient.invalidateQueries({
      queryKey: ["auth", "session"],
    });
    location.href = SIGN_IN_PATHNAME;
  };

  return {
    session,
    isAuthenticated: !!session,
    signOut,
  };
}
