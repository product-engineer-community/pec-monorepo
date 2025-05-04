"use client";

import { socialSignIn } from "@/features/auth/action";
import {
  DEFAULT_ENABLED_PROVIDERS,
  PROVIDER_NAMES,
  type SocialProvider,
} from "@/features/auth/model";
import { SocialLoginButton } from "@/features/auth/ui";

type SocialAuthFormProps = {
  providers?: SocialProvider[];
  error?: string | null;
  gridClass?: string;
};

export function SocialAuthForm({
  providers = DEFAULT_ENABLED_PROVIDERS,
  error = null,
  gridClass = "grid-cols-2",
}: SocialAuthFormProps) {
  return (
    <>
      {error && (
        <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className={`grid ${gridClass} gap-4`}>
        {providers.map((provider) => (
          <div key={provider} className="w-full">
            <form action={socialSignIn}>
              <input type="hidden" name="provider" value={provider} />
              <SocialLoginButton provider={provider} type="submit">
                {PROVIDER_NAMES[provider]}
              </SocialLoginButton>
            </form>
          </div>
        ))}
      </div>
    </>
  );
}
