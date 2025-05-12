"use client";

import { PasswordInput } from "@packages/auth/src/features";
import { signIn, type SignInState } from "@packages/auth/src/features";
import { Button, Input, Label } from "@packages/ui";
import { Link } from "lucide-react";
import { useActionState } from "react";

const initialState: SignInState = {
  error: null,
  success: false,
};

export function SignInForm() {
  const [state, formAction, isPending] = useActionState(signIn, initialState);
  return (
    <form action={formAction}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">이메일</Label>
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="name@example.com"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">비밀번호</Label>
          <PasswordInput name="password" id="password" required />
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
            href="/auth/signup"
            className="text-primary underline-offset-4 hover:underline"
          >
            회원가입
          </Link>
        </div>
      </div>
    </form>
  );
}
