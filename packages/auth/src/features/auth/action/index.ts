"use server";

import { getSupabaseClient } from "@packages/supabase/src/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  AUTH_CALLBACK_PATHNAME,
  getOrigin,
  SIGN_IN_PATHNAME,
} from "@packages/constants";
import { getSupabaseAdminClient } from "@packages/supabase";
import { getSupabaseServerClient } from "@packages/supabase";

import { AUTH_ERROR_MESSAGES } from "../config/error-messages";
import { getAuthErrorMessage } from "../lib/error-handler";
import type { SocialProvider } from "../model/social-auth";

export type AuthState = {
  error: string | null;
  success: boolean;
  message?: string;
};

export async function signUp(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const username = formData.get("username") as string;

  const supabase = await getSupabaseServerClient();
  const { error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}${AUTH_CALLBACK_PATHNAME}`,
    },
  });

  if (signUpError) {
    console.error(signUpError.message);
    return {
      error: AUTH_ERROR_MESSAGES["SIGN_UP_DEFAULT"],
      success: false,
    };
  }

  if (password !== confirmPassword) {
    return {
      success: false,
      error: "비밀번호가 일치하지 않습니다.",
    };
  }

  return {
    success: true,
    error: null,
    message:
      "이메일 확인 링크를 보냈습니다. 먼저 이메일을 확인하신 후 로그인 해주세요.",
  };
}

export async function signIn(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  // 폼 데이터 가져오기
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
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
        error: getAuthErrorMessage(error),
        success: false,
      };
    }

    // 로그인 후 로컬스토리지에 세션 저장 용으로 호출
    await supabaseClient.auth.getUser();
  } catch (error) {
    console.error("로그인 중 오류가 발생했습니다", error);
    return {
      error: "로그인 중 오류가 발생했습니다",
      success: false,
    };
  }

  revalidatePath("/", "layout");
  // 성공 시 try/catch 블록 외부에서 리다이렉트
  redirect(getOrigin());
}

export async function socialSignIn(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const provider = formData.get("provider") as SocialProvider;
  const nextPathname = formData.get("nextPathname") as string;
  console.log("🚀 ~ nextPathname:", nextPathname);

  const redirectTo = `${getOrigin()}${AUTH_CALLBACK_PATHNAME}?next=${getOrigin()}${nextPathname}`;

  const supabase = await getSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo,
    },
  });

  if (error) {
    return {
      error: error.message,
      success: false,
    };
  }

  if (!data?.url) {
    return {
      error: "리다이렉트 URL이 생성되지 않았습니다.",
      success: false,
    };
  }

  redirect(data.url);
}

export async function signOut() {
  const supabase = await getSupabaseServerClient();
  await supabase.auth.signOut();

  redirect(SIGN_IN_PATHNAME);
}

export async function getUserEmail(userId: string) {
  const supabaseAdmin = await getSupabaseAdminClient();

  const { data: user, error: userError } =
    await supabaseAdmin.auth.admin.getUserById(userId);

  if (userError) {
    throw userError;
  }

  return {
    email: user.user?.email,
  };
}
