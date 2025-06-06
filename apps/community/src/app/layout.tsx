import "@/app/globals.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import { Header, TokenHandlerInBrowser } from "@packages/auth/src/widgets";
import { BaseLayout } from "@packages/ui";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { Suspense } from "react";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    template: "%s | PEC 커뮤니티",
    default: "PEC 커뮤니티",
  },
  description:
    "다양한 주제에 대해 토론하고, 배우고, 지식을 공유하는 활기찬 PEC 커뮤니티에 참여하세요.",
  openGraph: {
    title: "PEC 커뮤니티",
    description:
      "다양한 주제에 대해 토론하고, 배우고, 지식을 공유하는 활기찬 PEC 커뮤니티에 참여하세요.",
    images: ["/logo.webp"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={GeistSans.className} suppressHydrationWarning>
      <BaseLayout header={<Header />}>
        <Suspense>
          <TokenHandlerInBrowser />
        </Suspense>
        {children}
      </BaseLayout>
      <GoogleAnalytics gaId="G-WGBMGCF9MG" />
    </html>
  );
}
