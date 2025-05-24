"use client";

import { Button } from "@packages/ui";

import { useAuth } from "../model";
import { MAIN_PATHNAME } from "@packages/constants";

export function SignOutButton() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    const currentUrl = window.location.href;
    // promise all 로 묶어서 처리
    await Promise.all([
      signOut(),
      fetch("/auth/callback/signout", {
        method: "POST",
      }),
    ]);
    if (currentUrl) {
      location.href = currentUrl;
    } else {
      location.href = MAIN_PATHNAME;
    }
  };

  return (
    <Button variant="ghost" onClick={handleSignOut}>
      로그아웃
    </Button>
  );
}
