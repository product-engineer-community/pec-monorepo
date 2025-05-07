"use client";

import { Button, cn, Input } from "@packages/ui";
import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState } from "react";

type PasswordInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
>;

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
      setIsVisible((prev) => !prev);
    };

    return (
      <div className="relative">
        <Input
          type={isVisible ? "text" : "password"}
          className={cn("pr-10", className)}
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-9 w-9 hover:bg-transparent"
          onClick={toggleVisibility}
          aria-label={
            isVisible ? "비밀번호 마스킹 처리하기" : "비밀번호 마스킹 해제하기"
          }
        >
          {isVisible ? (
            <Eye className="h-4 w-4 text-muted-foreground" />
          ) : (
            <EyeOff className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
