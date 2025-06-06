"use server";

import { getUserFromSupabase } from "@packages/supabase";
import { SignOutButton } from "../../features";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Text,
} from "@packages/ui";
import { ChevronDown, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HEADER_MENU_ITEMS, getOrigin } from "@packages/constants";
import LogoSrc from "../../asset/logo.webp";
import { LoginButton } from "./ui/LoginButton";

export async function Header() {
  const user = await getUserFromSupabase();
  const isAuthenticated = !!user;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <Link href={getOrigin()} className="mr-8 flex items-center gap-2">
          <Image
            src={LogoSrc}
            alt="PEC"
            width={32}
            height={32}
            className="rounded-full"
          />
          <Text size="xl" weight="bold" className="text-primary">
            P.E.C
          </Text>
        </Link>

        <nav className="hidden flex-1 items-center gap-6 md:flex">
          {HEADER_MENU_ITEMS.map((item) =>
            "items" in item ? (
              <DropdownMenu key={item.href}>
                <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                  {item.label}
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="bg-white">
                  {item.items.map(
                    (subItem: { href: string; label: string }) => (
                      <DropdownMenuItem key={subItem.href} asChild>
                        <Link href={subItem.href}>{subItem.label}</Link>
                      </DropdownMenuItem>
                    )
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {isAuthenticated ? (
            <>
              <Link
                href="/profile"
                className="rounded-md border-border p-3 text-sm font-medium transition-colors hover:text-primary"
              >
                {user?.user_metadata.username} 님
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Button asChild>
              <LoginButton />
            </Button>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto md:hidden"
              aria-label="메뉴 열기"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            {HEADER_MENU_ITEMS.map((item) =>
              "items" in item ? (
                <DropdownMenu key={item.href}>
                  <DropdownMenuTrigger className="w-full px-2 py-1.5 text-sm">
                    <span className="flex items-center justify-between">
                      {item.label}
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right">
                    {item.items.map(
                      (subItem: { href: string; label: string }) => (
                        <DropdownMenuItem key={subItem.href} asChild>
                          <Link href={subItem.href}>{subItem.label}</Link>
                        </DropdownMenuItem>
                      )
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <DropdownMenuItem key={item.href} asChild>
                  <Link href={item.href}>{item.label}</Link>
                </DropdownMenuItem>
              )
            )}
            <DropdownMenuSeparator />
            {isAuthenticated ? (
              <>
                <DropdownMenuItem asChild>
                  <span className="text-sm text-muted-foreground">
                    {user?.email}
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <SignOutButton />
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem asChild>
                <LoginButton />
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
