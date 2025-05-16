import "./globals.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import { Header } from "@packages/auth/src/widgets";
import { DropdownMenuWithPoint } from "@packages/point/src/entities";
import { BaseLayout } from "@packages/ui";
import { GeistSans } from "geist/font/sans";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "PEC Community",
  description: "Product Engineer Community",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={GeistSans.className} suppressHydrationWarning>
      <BaseLayout
        header={<Header DropdownMenuWithPoint={<DropdownMenuWithPoint />} />}
      >
        {children}
      </BaseLayout>
      <GoogleAnalytics gaId="G-WGBMGCF9MG" />
    </html>
  );
}
