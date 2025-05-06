"use client";

import { Button } from "@pec/ui";
import Image from "next/image";
import { ComponentProps } from "react";

import {
  PROVIDER_ICON_PATHS,
  PROVIDER_NAMES,
  type SocialProvider,
} from "../model/social-auth";

type SocialLoginButtonProps = ComponentProps<typeof Button> & {
  provider: SocialProvider;
};

export function SocialLoginButton({
  provider,
  className = "",
  children,
  ...props
}: SocialLoginButtonProps) {
  return (
    <Button
      variant="outline"
      className={`flex w-full items-center justify-center gap-2 ${className}`}
      type="button"
      {...props}
    >
      <Image
        src={PROVIDER_ICON_PATHS[provider]}
        width={16}
        height={16}
        alt={`${PROVIDER_NAMES[provider]} logo`}
      />
      {children || PROVIDER_NAMES[provider]}
    </Button>
  );
}
