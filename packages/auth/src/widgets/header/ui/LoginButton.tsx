"use client";

import { SIGN_IN_PATHNAME } from "@packages/constants";
import { AUTH_PATHNAME } from "@packages/constants";
import { getOrigin } from "@packages/constants";
import Link from "next/link";
import { useEffect, useState } from "react";

export function LoginButton() {
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    setPathname(
      window.location.pathname + window.location.search + window.location.hash
    );
  }, []);

  return (
    <Link
      href={`${getOrigin()}${AUTH_PATHNAME}${SIGN_IN_PATHNAME}?nextPathname=${pathname}`}
    >
      로그인
    </Link>
  );
}
