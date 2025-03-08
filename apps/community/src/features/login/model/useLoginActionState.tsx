import { login } from "@/features/login/api/login";
import { AuthFormState } from "@/features/auth/model/auth.interface";
import { useActionState } from "react";
import { MAIN_PATHNAME } from "@/shared/config/pathname";
import { redirect } from "next/navigation";

export const useLoginActionState = () => {
  const loginWithFormData = async (
    prevState: AuthFormState,
    formData: FormData,
  ) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await login({ email, password });

    if (res.message !== "SUCCESS") {
      return res;
    }

    redirect(MAIN_PATHNAME);
  };

  const [loginFormState, loginFormAction] = useActionState<
    AuthFormState,
    FormData
  >(loginWithFormData, null);

  return { loginFormState, loginFormAction };
};
