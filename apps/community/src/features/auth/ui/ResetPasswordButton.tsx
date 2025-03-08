import { Button } from "@/shared/ui";
import { createClient } from "@/shared/utils/supabase/server";
import { encodedRedirect } from "@/shared/utils/supabase/utils";

export default function ResetPasswordButton() {
  const resetPasswordAction = async (formData: FormData) => {
    "use server";
    const supabase = await createClient();

    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!password || !confirmPassword) {
      encodedRedirect(
        "error",
        "/reset-password",
        "Password and confirm password are required",
      );
    }

    if (password !== confirmPassword) {
      encodedRedirect("error", "/reset-password", "Passwords do not match");
    }

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      encodedRedirect("error", "/reset-password", "Password update failed");
    }

    encodedRedirect("success", "/reset-password", "Password updated");
  };

  return <Button formAction={resetPasswordAction}>Reset password</Button>;
}
