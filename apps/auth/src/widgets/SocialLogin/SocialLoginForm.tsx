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
import { useActionState } from "react";

type SocialLoginFormProps = {
  providers?: SocialProvider[];
  nextPathname?: string;
};

const initialState: AuthState = {
  error: null,
  success: false,
};

export function SocialLoginForm({
  providers = DEFAULT_ENABLED_PROVIDERS,
  nextPathname,
}: SocialLoginFormProps) {
  const [state, formAction] = useActionState(socialSignIn, initialState);

  return (
    <>
      <div className="flex flex-col gap-4">
        {providers.map((provider) => (
          <div key={provider} className="w-full">
            <form action={formAction}>
              <input type="hidden" name="nextPathname" value={nextPathname} />
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
