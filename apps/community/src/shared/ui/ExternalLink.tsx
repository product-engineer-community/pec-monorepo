"use client";

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
}

export const ExternalLink = ({ href, children }: ExternalLinkProps) => {
  return (
    <a
      className="hover:underline"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};
