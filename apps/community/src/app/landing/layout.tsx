interface LandingLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function LandingLayout({ children, modal }: LandingLayoutProps) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
