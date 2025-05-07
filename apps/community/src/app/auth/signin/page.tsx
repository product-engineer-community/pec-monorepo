"use client";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "@pec/ui";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { signIn, SignInState } from "@/features/auth/action";
import { PasswordInput } from "@/features/auth/ui";
import { SocialAuthForm, SocialLoginDivider } from "@/widgets/social-login";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      className="w-full"
      type="submit"
      disabled={pending}
      isLoading={pending}
    >
      로그인
    </Button>
  );
}

const initialState: SignInState = {
  error: null,
  success: false,
};

export default function SignInPage() {
  const [state, formAction] = useActionState(signIn, initialState);

  return (
    <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 px-4 sm:w-auto">
      <Card className="w-full sm:w-[350px]">
        <CardHeader>
          <CardTitle>로그인</CardTitle>
          <CardDescription>PEC에 오신 것을 환영합니다.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <SocialLoginDivider />

          <SocialAuthForm />

          <div className="text-center text-sm text-muted-foreground">또는</div>

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
              <SubmitButton />

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
        </CardContent>
      </Card>
    </div>
  );
}
