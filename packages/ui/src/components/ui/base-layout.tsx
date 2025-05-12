interface BaseLayoutProps {
  header: React.ReactNode;
  children: React.ReactNode;
}

export function BaseLayout({ header, children }: BaseLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {header}
      <main className="flex flex-1">
        <div className="mx-auto w-full max-w-7xl bg-background px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <footer className="flex w-full justify-center border-t border-t-foreground/10 p-4 text-center text-xs">
        <div className="text-left text-stone-400">
          <div>상호명: 피이씨(PEC)학원 | 대표: 황경찬</div>
          <div>사업자등록번호: 618-95-87691</div>
          <div>주소: 경기도 성남시 분당구 벌말로 30번길 46 706</div>
          <div>문의: 010 5056 2412</div>
          <div className="flex justify-between">
            <a href="https://slashpage.com/pec/terms-of-use">이용약관</a>
            <a href="https://slashpage.com/pec/privacy-policy">
              개인정보 처리방침
            </a>
          </div>
          Copyright© PEC
        </div>
      </footer>
    </div>
  );
}
