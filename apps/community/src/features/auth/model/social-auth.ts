"use client";

export type SocialProvider = "google" | "github";

export const PROVIDER_NAMES: Record<SocialProvider, string> = {
  google: "Google",
  github: "GitHub",
};

export const DEFAULT_ENABLED_PROVIDERS: SocialProvider[] = ["google", "github"];

export const PROVIDER_ICON_PATHS: Record<SocialProvider, string> = {
  google: "/auth/providers/google.svg",
  github: "/auth/providers/github.svg",
};
