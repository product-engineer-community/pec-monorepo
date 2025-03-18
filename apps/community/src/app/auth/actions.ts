"use server";

import { getSupabaseClient } from "@pec/supabase";

export async function signUp(
  email: string,
  password: string,
  username: string,
) {
  const supabase = getSupabaseClient({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  });

  const { error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (signUpError) {
    return { error: signUpError.message };
  }

  return {
    success: true,
    message: "이메일 확인 링크를 보냈습니다. 이메일을 확인해주세요.",
  };
}
