"use client";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "@pec/shared";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { signIn, SignInState } from "@/features/auth/action";
import { PasswordInput } from "@/features/auth/ui";

// 폼 제출 버튼 컴포넌트
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

// 초기 상태 정의
const initialState: SignInState = {
  error: null,
  success: false,
};

export default function SignInPage() {
  // Server Action과 폼 상태 관리
  const [state, formAction] = useActionState(signIn, initialState);

  return (
    <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 px-4 sm:w-auto">
      <Card className="w-full sm:w-[350px]">
        <CardHeader>
          <CardTitle>로그인</CardTitle>
          <CardDescription>PEC에 오신 것을 환영합니다.</CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent className="space-y-4">
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
              <p className="text-sm text-destructive">{state.error}</p>
            )}
          </CardContent>
          <CardFooter className="mt-4 flex flex-col space-y-2">
            <SubmitButton />
            <div className="text-sm text-muted-foreground">
              계정이 없으신가요?{" "}
              <Link
                href="/auth/signup"
                className="text-primary underline-offset-4 hover:underline"
              >
                회원가입
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
