"use client";

import { cn } from "../../utils/cn";

interface ExternalLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export const ExternalLink = ({
  href,
  className,
  children,
}: ExternalLinkProps) => {
  return (
    <a
      className={cn("hover:underline", className)}
      href={href}
      target="_self"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};
