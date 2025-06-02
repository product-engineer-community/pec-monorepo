"use client";

import { PasswordInput } from "@packages/auth/src/features";
import { type AuthState, signIn } from "@packages/auth/src/features";
import { getSupabaseClient } from "@packages/supabase/src/client";
import { Button, Input, Label } from "@packages/ui";
import Link from "next/link";
import { useActionState, useEffect } from "react";

const initialState: AuthState = {
  error: null,
  success: false,
};

export interface SignInFormProps {
  nextPathname?: string;
}

export function SignInForm({ nextPathname }: SignInFormProps) {
  const [state, formAction, isPending] = useActionState(signIn, initialState);

  useEffect(() => {
    if (state.success && state.data) {
      const supabase = getSupabaseClient({
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL!,
        NEXT_PUBLIC_SUPABASE_ANON_KEY:
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      });
      supabase.auth.setSession(state.data.session);
      window.location.href = state.redirectUrl || "/";
    }
  }, [state.success, state.data, state.redirectUrl]);

  return (
    <form action={formAction}>
      <input type="hidden" name="nextPathname" value={nextPathname} />
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            title="유효한 이메일 주소를 입력해주세요."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">비밀번호</Label>
          <PasswordInput
            id="password"
            name="password"
            required
            minLength={6}
            title="비밀번호는 최소 6자 이상이어야 합니다."
          />
        </div>
        {state?.error && (
          <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {state.error}
          </div>
        )}
        <Button
          className="w-full"
          type="submit"
          disabled={isPending}
          isLoading={isPending}
        >
          로그인
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          계정이 없으신가요?{" "}
          <Link
            href="/signup"
            className="text-primary underline-offset-4 hover:underline"
          >
            회원가입
          </Link>
        </div>
      </div>
    </form>
  );
}
