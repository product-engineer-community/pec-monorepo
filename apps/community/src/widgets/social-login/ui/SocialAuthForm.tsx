"use client";

import { useActionState } from "react";

import { SignInState, socialSignIn } from "@/features/auth/action";
import {
  DEFAULT_ENABLED_PROVIDERS,
  PROVIDER_NAMES,
  type SocialProvider,
} from "@/features/auth/model";
import { SocialLoginButton } from "@/features/auth/ui";

type SocialAuthFormProps = {
  providers?: SocialProvider[];
  gridClass?: string;
};

const initialState: SignInState = {
  error: null,
  success: false,
};

export function SocialAuthForm({
  providers = DEFAULT_ENABLED_PROVIDERS,
}: SocialAuthFormProps) {
  const [state, formAction] = useActionState(socialSignIn, initialState);

  return (
    <>
      <div className="flex flex-col gap-4">
        {providers.map((provider) => (
          <div key={provider} className="w-full">
            <form action={formAction}>
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
