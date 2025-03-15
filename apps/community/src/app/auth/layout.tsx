export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="flex flex-1">{children}</main>;
}
