export type SocialProvider = "google" | "github" | "figma";

export const PROVIDER_NAMES: Record<SocialProvider, string> = {
  google: "Google",
  github: "GitHub",
  figma: "Figma",
};

export const DEFAULT_ENABLED_PROVIDERS: SocialProvider[] = [
  "google",
  "github",
  "figma",
];

export const PROVIDER_ICON_PATHS: Record<SocialProvider, string> = {
  google: "/auth/providers/google.svg",
  github: "/auth/providers/github.svg",
  figma: "/auth/providers/figma.svg",
};
