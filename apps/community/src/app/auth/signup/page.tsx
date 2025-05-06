"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
} from "@pec/ui";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { signUp } from "@/features/auth/action";
import { PasswordInput } from "@/features/auth/ui";
import { SignUpInput, signUpSchema } from "@/lib/validations/auth";

export default function SignUpPage() {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpInput) => {
    try {
      const result = await signUp(data.email, data.password, data.username);
      if (result?.error) {
        setError(result.error);
      } else if (result?.success) {
        setSuccess(true);
        setMessage(result.message);
      }
    } catch {
      setError("회원가입 중 오류가 발생했습니다");
    }
  };

  if (success && message) {
    return (
      <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 px-4 sm:w-auto">
        <Card className="w-full sm:w-[350px]">
          <CardHeader>
            <CardTitle>회원가입 완료</CardTitle>
            <CardDescription>{message}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href="/auth/signin" className="w-full">
              <Button className="w-full">로그인 페이지로 이동</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 px-4 sm:w-auto">
      <Card className="w-full sm:w-[350px]">
        <CardHeader>
          <CardTitle>회원가입</CardTitle>
          <CardDescription>
            새로운 계정을 만들어 PEC를 시작하세요.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                {...register("email")}
                id="email"
                type="email"
                placeholder="name@example.com"
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">사용자 이름</Label>
              <Input
                {...register("username")}
                id="username"
                placeholder="username"
              />
              {errors.username && (
                <p className="text-sm text-destructive">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <PasswordInput {...register("password")} id="password" />
              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">비밀번호 확인</Label>
              <PasswordInput
                {...register("confirmPassword")}
                id="confirmPassword"
              />
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </CardContent>
          <CardFooter className="mt-4 flex flex-col space-y-2">
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "회원가입 중..." : "회원가입"}
            </Button>
            <div className="text-sm text-muted-foreground">
              이미 계정이 있으신가요?{" "}
              <Link
                href="/auth/signin"
                className="text-primary underline-offset-4 hover:underline"
              >
                로그인
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
