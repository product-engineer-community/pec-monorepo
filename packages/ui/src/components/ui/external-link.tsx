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
  ...props
}: ExternalLinkProps) => {
  return (
    <a
      className={cn("hover:underline", className)}
      href={href}
      target={target}
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  );
};
