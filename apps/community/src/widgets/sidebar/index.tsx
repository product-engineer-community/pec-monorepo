"use client";

import {
  COMMUNITY_ARTICLES_PATHNAME,
  COMMUNITY_EVENTS_PATHNAME,
  COMMUNITY_FSD_PATHNAME,
  COMMUNITY_LANDING_PATHNAME,
  COMMUNITY_NEXTJS_PATHNAME,
  COMMUNITY_PRODUCTIVITY_PATHNAME,
} from "@packages/constants";
import {
  cn,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@packages/ui";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type SidebarItem = {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  items?: SidebarItem[]; // 재귀적 정의
};

const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    label: "Home",
    href: COMMUNITY_LANDING_PATHNAME,
  },
  {
    label: "Community",
    items: [
      {
        label: "Productivity",
        href: COMMUNITY_PRODUCTIVITY_PATHNAME,
      },
      {
        label: "F.S.D",
        href: COMMUNITY_FSD_PATHNAME,
      },
      {
        label: "Next.js",
        href: COMMUNITY_NEXTJS_PATHNAME,
      },
    ],
  },
  {
    label: "Articles",
    href: COMMUNITY_ARTICLES_PATHNAME,
  },
  {
    label: "Events",
    href: COMMUNITY_EVENTS_PATHNAME,
  },
];

function SidebarLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon?: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center rounded-md px-3 py-2 text-sm transition-colors",
        isActive
          ? "bg-accent font-medium text-accent-foreground"
          : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground",
      )}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </Link>
  );
}

function SidebarItemComponent({ item }: { item: SidebarItem }) {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const hasItems = item.items && item.items.length > 0;
  const isActive = hasItems
    ? item.items?.some(
        (childItem) =>
          pathname === childItem.href ||
          childItem.items?.some((subItem) => pathname === subItem.href),
      )
    : item.href
      ? pathname === item.href
      : false;

  if (item.href) {
    return <SidebarLink href={item.href} label={item.label} icon={item.icon} />;
  }

  if (!hasItems) {
    return (
      <div
        className={cn(
          "flex w-full items-center rounded-md px-3 py-2 text-sm",
          "text-muted-foreground",
        )}
      >
        {item.label}
      </div>
    );
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger
        className={cn(
          "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors",
          isActive ? "font-medium text-foreground" : "text-muted-foreground",
        )}
      >
        {item.label}
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-1 px-2 py-2">
        {item.items!.map((subItem) => (
          <SidebarItemComponent
            key={subItem.label + (subItem.href || "")}
            item={subItem}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden md:flex md:w-[240px] md:shrink-0 md:flex-col">
      <div className="md:sticky md:top-[73px] md:flex md:h-[calc(100vh-73px)] md:flex-col md:gap-2 md:overflow-auto md:px-2 md:py-6">
        {SIDEBAR_ITEMS.map((item) => (
          <SidebarItemComponent
            key={item.label + (item.href || "")}
            item={item}
          />
        ))}
      </div>
    </aside>
  );
}
