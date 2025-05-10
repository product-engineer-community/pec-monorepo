"use client";

import { cn } from "@packages/ui";
import { UserIcon } from "lucide-react";
import Image from "next/image";

interface AvatarProps {
  src?: string | null;
  alt?: string;
  size?: number;
  className?: string;
}

export function Avatar({ src, alt, size = 40, className }: AvatarProps) {
  if (!src) {
    return (
      <div 
        className={cn(
          "flex items-center justify-center bg-muted rounded-full",
          className
        )}
        style={{ width: size, height: size }}
      >
        <UserIcon className="w-1/2 h-1/2 text-muted-foreground" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt || ""}
      width={size}
      height={size}
      className={cn("rounded-full object-cover", className)}
    />
  );
}
