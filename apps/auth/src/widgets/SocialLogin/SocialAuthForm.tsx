"use client";

import {
  DEFAULT_ENABLED_PROVIDERS,
  PROVIDER_NAMES,
  type SocialProvider,
} from "@packages/auth/src/features";
import {
  AuthState,
  socialSignIn,
} from "@packages/auth/src/features/auth/action";
import { SocialLoginButton } from "@packages/auth/src/features/auth/ui";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";

type SocialAuthFormProps = {
  providers?: SocialProvider[];
  gridClass?: string;
};

const initialState: AuthState = {
  error: null,
  success: false,
};

export function SocialAuthForm({
  providers = DEFAULT_ENABLED_PROVIDERS,
}: SocialAuthFormProps) {
  const [state, formAction] = useActionState(socialSignIn, initialState);
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "https://productengineer.info";

  return (
    <>
      <div className="flex flex-col gap-4">
        {providers.map((provider) => (
          <div key={provider} className="w-full">
            <form action={formAction}>
              <input type="hidden" name="next" value={next} />
              <input type="hidden" name="provider" value={provider} />
              <SocialLoginButton provider={provider}>
                {PROVIDER_NAMES[provider]}
              </SocialLoginButton>
            </form>
          </div>
        ))}
      </div>

      {state.error && (
        <div className="rounded-md text-center text-sm text-destructive">
          {state.error}
        </div>
      )}
    </>
  );
}
