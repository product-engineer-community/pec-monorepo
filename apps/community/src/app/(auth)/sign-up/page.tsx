import SignUpForm from "@/features/sign-up/ui/SignUpForm";

export default async function SignUp() {
  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
      <SignUpForm />
    </div>
  );
}
