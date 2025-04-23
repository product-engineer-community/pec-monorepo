"use client";

import { Button } from "@pec/shared";

import { useAuth } from "@/hooks/use-auth";

export function SignOutButton() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    // promise all 로 묶어서 처리
    await Promise.all([
      signOut(),
      fetch("/auth/callback/signout", {
        method: "POST",
      }),
    ]);
  };

  return (
    <Button variant="ghost" onClick={handleSignOut}>
      로그아웃
    </Button>
  );
}
