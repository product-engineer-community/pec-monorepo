import "@/app/globals.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import { BaseLayout } from "@packages/ui";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "sonner";

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
      <body className="bg-background text-foreground">
        <BaseLayout>{children}</BaseLayout>
        <Toaster position="top-center" />
      </body>
      <GoogleAnalytics gaId="G-WGBMGCF9MG" />
    </html>
  );
}
