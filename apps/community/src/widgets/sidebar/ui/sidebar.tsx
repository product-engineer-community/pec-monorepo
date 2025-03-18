"use client";

import {
  COMMUNITY_DISCUSSIONS_PATHNAME,
  COMMUNITY_EVENTS_PATHNAME,
  COMMUNITY_QUESTIONS_PATHNAME,
  COMMUNITY_BLOG_PATHNAME,
  MAIN_PATHNAME,
} from "@/src/shared/config/pathname";
import {
  cn,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@pec/shared";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type SidebarSection = {
  title: string;
  collapsible?: boolean;
  items: {
    label: string;
    href: string;
    icon?: React.ReactNode;
  }[];
};

const SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    title: "Home",
    collapsible: false,
    items: [
      {
        label: "Home",
        href: MAIN_PATHNAME,
      },
    ],
  },
  {
    title: "Dev",
    collapsible: true,
    items: [
      {
        label: "Blog",
        href: COMMUNITY_BLOG_PATHNAME,
      },
      {
        label: "Events",
        href: COMMUNITY_EVENTS_PATHNAME,
      },
    ],
  },
  {
    title: "Community",
    collapsible: true,
    items: [
      {
        label: "Questions",
        href: COMMUNITY_QUESTIONS_PATHNAME,
      },
      {
        label: "Discussions",
        href: COMMUNITY_DISCUSSIONS_PATHNAME,
      },
    ],
  },
];

function SidebarItem({ href, label }: { href: string; label: string }) {
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
      {label}
    </Link>
  );
}

function SidebarSection({ section }: { section: SidebarSection }) {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const isActive = section.items.some((item) => pathname === item.href);

  if (!section.collapsible) {
    return (
      <div className="space-y-1">
        {section.items.map((item) => (
          <SidebarItem key={item.href} {...item} />
        ))}
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
        {section.title}
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-1 px-2 py-2">
        {section.items.map((item) => (
          <SidebarItem key={item.href} {...item} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

export function Sidebar() {
  return (
    <aside className="w-[240px] shrink-0">
      <div className="sticky top-[73px] flex h-[calc(100vh-73px)] flex-col gap-2 overflow-auto px-2 py-6">
        {SIDEBAR_SECTIONS.map((section) => (
          <SidebarSection key={section.title} section={section} />
        ))}
      </div>
    </aside>
  );
}
