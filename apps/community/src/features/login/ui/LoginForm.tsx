"use client";

import { Button } from "@/shared/ui/button";
import { EmailInput, PasswordInput } from "@/features/auth/ui";
import { useLoginActionState } from "@/features/login/model/useLoginActionState";
import Link from "next/link";
import { SIGN_UP_PATHNAME } from "@/shared/config/pathname";

export default function LoginForm() {
  const { loginFormState, loginFormAction } = useLoginActionState();

  return (
    <form className="flex w-full flex-1 flex-col justify-center gap-4 text-foreground">
      <EmailInput />
      <PasswordInput />
      <Button className="mt-4" variant="outline" formAction={loginFormAction}>
        Login
      </Button>
      <Button asChild>
        <Link href={SIGN_UP_PATHNAME}>Sign Up</Link>
      </Button>
      <p className="mt-4 p-4 text-center text-foreground text-red-500">
        {loginFormState?.message}
      </p>
    </form>
  );
}
