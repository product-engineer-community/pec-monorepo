"use client";

import { Button } from "@packages/ui";

import { useAuth } from "../model";
import { MAIN_PATHNAME } from "../config/pathname";

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
    location.href = MAIN_PATHNAME;
  };

  return (
    <Button variant="ghost" onClick={handleSignOut}>
      로그아웃
    </Button>
  );
}
