"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, Label } from "@pec/shared";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useAuth } from "@/hooks/use-auth";
import { SignInInput, signInSchema } from "@/lib/validations/auth";

export default function SignInPage() {
  const [error, setError] = useState<string>();
  const { signIn } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInInput) => {
    try {
      const result = await signIn(data.email, data.password);
      if (result?.error) {
        setError(result.error);
      }
    } catch {
      setError("로그인 중 오류가 발생했습니다");
    }
  };

  return (
    <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 px-4 sm:w-auto">
      <Card className="w-full sm:w-[350px]">
        <CardHeader>
          <CardTitle>로그인</CardTitle>
          <CardDescription>
            PEC에 오신 것을 환영합니다.
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
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input {...register("password")} id="password" type="password" />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 mt-4">
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "로그인 중..." : "로그인"}
            </Button>
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
