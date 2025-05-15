"use client";

import { cn } from "../../utils/cn";

interface ExternalLinkProps {
  href: string;
  className?: string;
  target?: string;
  children: React.ReactNode;
}

export const ExternalLink = ({
  href,
  className,
  target = "_self",
  children,
}: ExternalLinkProps) => {
  return (
    <a
      className={cn("hover:underline", className)}
      href={href}
      target={target}
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};
