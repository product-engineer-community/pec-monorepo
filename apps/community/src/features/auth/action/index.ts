"use server";

import { getSupabaseClient } from "@pec/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { signInSchema } from "@/lib/validations/auth";
import { getSupabaseServerClient } from "@/shared/supabase/server";
import {
  COMMUNITY_PATHNAME,
  SIGN_IN_PATHNAME,
} from "@/src/shared/config/pathname";

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

// 로그인 상태 타입 정의
export type SignInState = {
  error: string | null;
  success: boolean;
};

export async function signIn(
  prevState: SignInState,
  formData: FormData,
): Promise<SignInState> {
  // 폼 데이터 가져오기
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    // 유효성 검사
    const validatedFields = signInSchema.safeParse({ email, password });

    if (!validatedFields.success) {
      return {
        error:
          validatedFields.error.errors[0]?.message ||
          "유효하지 않은 로그인 정보입니다.",
        success: false,
      };
    }

    // Supabase 클라이언트 생성
    const supabase = await getSupabaseServerClient();
    const supabaseClient = getSupabaseClient({
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    });

    // 로그인 시도
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        error: error.message,
        success: false,
      };
    }

    // 로그인 후 로컬스토리지에 세션 저장 용으로 호출
    await supabaseClient.auth.getUser();
  } catch (error) {
    console.error("로그인 오류:", error);
    return {
      error: "로그인 중 오류가 발생했습니다",
      success: false,
    };
  }
  revalidatePath("/", "layout");
  // 성공 시 try/catch 블록 외부에서 리다이렉트
  redirect(COMMUNITY_PATHNAME);
}

export async function signOut() {
  const supabase = await getSupabaseServerClient();
  await supabase.auth.signOut();

  redirect(SIGN_IN_PATHNAME);
}
