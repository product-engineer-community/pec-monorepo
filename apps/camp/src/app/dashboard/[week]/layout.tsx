interface DashboardWeekLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function DashboardWeekLayout({
  children,
  modal,
}: DashboardWeekLayoutProps) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
