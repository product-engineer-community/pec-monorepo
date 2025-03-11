import { Header } from "@/widgets/header/ui/header";

export function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* 메인 컨텐츠 */}
      <main className="py-6">{children}</main>
    </div>
  );
}
