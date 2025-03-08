import { GeistSans } from "geist/font/sans";
import AuthButton from "@/features/auth/ui/AuthButton";
import { ExternalLink } from "@/shared/ui/ExternalLink";
import "@/app/globals.css";
import { Logo } from "@/shared/ui/Logo";
import { Providers } from "./providers";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Cursor Rules",
  description: "Manage and view your Cursor editor rules",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <Providers>
          <main className="flex min-h-screen flex-col">
            <nav className="sticky top-0 z-50 flex h-16 w-full justify-center border-b border-b-foreground/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="flex w-full max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Logo />
                <AuthButton />
              </div>
            </nav>

            {children}

            <footer className="mt-auto w-full border-t border-t-foreground/10 bg-background py-6">
              <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="text-left text-sm text-stone-400">
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                    <div>상호명: 마중물 | 대표: 황경찬</div>
                    <div>사업자등록번호: 264-01-01901</div>
                    <div>정보통신업 주소: 경기도 광주시 회안대로 350-23</div>
                    <div>문의: 010 5056 2412</div>
                  </div>
                  <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-between">
                    <ExternalLink href="https://slashpage.com/pec/terms-of-use">
                      이용약관
                    </ExternalLink>
                    <ExternalLink href="https://slashpage.com/pec/privacy-policy">
                      개인정보 처리방침
                    </ExternalLink>
                  </div>
                  <div className="mt-4 text-center">Copyright© PEC</div>
                </div>
              </div>
            </footer>
          </main>
        </Providers>
      </body>
    </html>
  );
}
