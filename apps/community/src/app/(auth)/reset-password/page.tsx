import ResetPasswordButton from "@/features/auth/ui/ResetPasswordButton";
import { Input, Label } from "@/shared/ui";

export default async function ResetPassword() {
  return (
    <form className="flex w-full max-w-md flex-col gap-2 p-4 [&>input]:mb-4">
      <h1 className="text-2xl font-medium">Reset password</h1>
      <p className="text-sm text-foreground/60">
        Please enter your new password below.
      </p>
      <Label htmlFor="password">New password</Label>
      <Input
        type="password"
        name="password"
        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}"
        title="Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character."
        placeholder="New password"
        required
      />
      <Label htmlFor="confirmPassword">Confirm password</Label>
      <Input
        type="password"
        name="confirmPassword"
        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}"
        title="Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character."
        placeholder="Confirm password"
        required
      />
      <ResetPasswordButton />
    </form>
  );
}
