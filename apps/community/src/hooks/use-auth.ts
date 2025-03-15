import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSupabaseClient } from "@pec/supabase";
import { useRouter } from "next/navigation";

export function useAuth() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const supabase = getSupabaseClient();

  const { data: session } = useQuery({
    queryKey: ["auth", "session"],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    },
    refetchInterval: 1000 * 60 * 5, 
  });

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: error.message };
    }

    queryClient.setQueryData(["auth", "session"], data.session);
    router.push("/community");
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    queryClient.invalidateQueries({
      queryKey: ["auth", "session"],
    });
    router.push("/auth/signin");
  };

  return {
    session,
    isAuthenticated: !!session,
    signIn,
    signOut,
  };
}
