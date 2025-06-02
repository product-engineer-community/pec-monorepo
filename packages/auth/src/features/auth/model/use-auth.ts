"use client";
import { getSupabaseClient } from "@packages/supabase/src/client";
import { useEffect, useState } from "react";

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

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const isAuthenticated = async () => {
      const session = await getSession();
      console.log("🚀 ~ isAuthenticated ~ session:", session);
      setIsAuthenticated(!!session);
    };
    isAuthenticated();
  }, [getSession]);

  return {
    getSession,
    signOut,
    isAuthenticated,
  };
}
