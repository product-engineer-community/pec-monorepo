import { Input, Label } from "@/shared/ui";

export function PasswordInput() {
  return (
    <>
      <Label htmlFor="password">Password</Label>
      <Input
        type="password"
        name="password"
        placeholder="••••••••"
        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}"
        title="Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character."
        required
      />
    </>
  );
}
