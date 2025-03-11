import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { Text } from "@/shared/ui/text";

const MENU_ITEMS = [
  { label: "Explore", href: "/explore" },
  { label: "Community", href: "/community" },
  { label: "Blog", href: "/blog" },
  { label: "Event", href: "/event" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center">
        {/* 로고 */}
        <Link href="/" className="mr-8">
          <Text size="xl" weight="bold" className="text-primary">
            PEC
          </Text>
        </Link>

        {/* 메인 네비게이션 */}
        <nav className="hidden flex-1 items-center gap-6 md:flex">
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* 모바일 메뉴 버튼 */}
        <button className="mr-2 inline-flex items-center justify-center rounded-md p-2.5 text-muted-foreground hover:bg-accent hover:text-foreground md:hidden">
          <span className="sr-only">메뉴 열기</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>

        {/* 로그인 버튼 */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden md:inline-flex">
            로그인
          </Button>
          <Button size="sm">회원가입</Button>
        </div>
      </div>
    </header>
  );
}
