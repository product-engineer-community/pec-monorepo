"use client";

import {
  type AuthState,
  PasswordInput,
  signUp,
} from "@packages/auth/src/features";
import { Button, Input, Label } from "@packages/ui";
import Link from "next/link";
import { useActionState } from "react";

const initialState: AuthState = {
  error: null,
  success: false,
};

export function SignUpForm() {
  const [state, formAction, isPending] = useActionState(signUp, initialState);

  if (state.success) {
    return (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-medium">회원가입 완료</h3>
          <p className="text-sm text-muted-foreground">{state.message}</p>
        </div>
        <Button asChild className="w-full">
          <Link href="/auth/signin">로그인 페이지로 이동</Link>
        </Button>
      </div>
    );
  }

  return (
    <form action={formAction}>
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
          <Label htmlFor="username">사용자 이름</Label>
          <Input
            id="username"
            name="username"
            placeholder="username"
            required
            minLength={3}
            maxLength={50}
            title="사용자 이름은 최소 3자 이상, 최대 50자까지 가능합니다."
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
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">비밀번호 확인</Label>
          <PasswordInput
            id="confirmPassword"
            name="confirmPassword"
            required
            title="비밀번호 확인을 입력해주세요."
          />
        </div>
        {state.error && (
          <p className="text-sm text-destructive">{state.error}</p>
        )}
        <Button
          className="w-full"
          type="submit"
          isLoading={isPending}
          disabled={isPending}
        >
          회원가입
        </Button>
        <div className="text-center text-sm text-muted-foreground">
          이미 계정이 있으신가요?{" "}
          <Link
            href="/auth/signin"
            className="text-primary underline-offset-4 hover:underline"
          >
            로그인
          </Link>
        </div>
      </div>
    </form>
  );
}
