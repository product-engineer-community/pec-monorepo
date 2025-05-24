import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@packages/ui";

import { SignInForm } from "@/src/widgets/SignInForm";
import { SocialLoginDivider, SocialLoginForm } from "@/widgets/SocialLogin";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const nextPathname = (await searchParams).nextPathname;

  return (
    <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 px-4 sm:w-auto">
      <Card className="w-full sm:w-[350px]">
        <CardHeader>
          <CardTitle>로그인</CardTitle>
          <CardDescription>PEC에 오신 것을 환영합니다.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <SocialLoginDivider />

          <SocialLoginForm nextPathname={nextPathname} />

          <div className="text-center text-sm text-muted-foreground">또는</div>

          <SignInForm nextPathname={nextPathname} />
        </CardContent>
      </Card>
    </div>
  );
}
