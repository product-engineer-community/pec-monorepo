"use client";

import { useAuth } from "@packages/auth/src/features";
import {
  AUTH_PATHNAME,
  COMMUNITY_POST_PATHNAME,
  getOrigin,
  SIGN_IN_PATHNAME,
} from "@packages/constants";
import { Button } from "@packages/ui";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function StartCTAButton() {
  const { isAuthenticated } = useAuth();

  const ctaButtonUrl = isAuthenticated
    ? COMMUNITY_POST_PATHNAME
    : `${getOrigin()}${AUTH_PATHNAME}${SIGN_IN_PATHNAME}`;

  return (
    <Button size="xl" asChild>
      <Link href={ctaButtonUrl}>
        {isAuthenticated ? "커뮤니티 둘러보기" : "지금 시작하기"}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </Button>
  );
}
