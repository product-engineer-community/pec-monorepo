import { Sidebar } from "@/src/widgets/sidebar";

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-8">
      <Sidebar />
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
