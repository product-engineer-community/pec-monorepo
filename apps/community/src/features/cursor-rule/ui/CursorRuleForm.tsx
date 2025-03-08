"use client";

import { Button } from "@/shared/ui/button";
import { Label } from "@/shared/ui/label";
import { useCreateCursorRuleActionState } from "../model/useCreateCursorRuleActionState";
import { Textarea } from "@/src/shared/ui/textarea";
import { useState } from "react";

export function CursorRuleForm() {
  const { createRuleState, createRuleAction } =
    useCreateCursorRuleActionState();
  const [validationError, setValidationError] = useState<string>("");

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    const englishOnly = /^[A-Za-z0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]*$/;

    if (!englishOnly.test(content)) {
      setValidationError(
        "Only English characters, numbers, and special characters are allowed.",
      );
    } else {
      setValidationError("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Check for Command+Return (Mac) or Control+Enter (Windows/Linux)
    if ((e.metaKey || e.ctrlKey) && (e.key === "Enter" || e.key === "Return")) {
      e.preventDefault();
      if (!validationError) {
        const form = e.currentTarget.closest("form");
        if (form) {
          form.requestSubmit();
        }
      }
    }
  };

  return (
    <form action={createRuleAction} className="space-y-4">
      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          required
          rows={15}
          placeholder="Enter cursor rule content (Press Cmd+Return or Ctrl+Enter to submit)"
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 font-mono text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          onChange={handleContentChange}
          onKeyDown={handleKeyDown}
        />
      </div>

      {validationError && (
        <p className="text-sm text-red-500">{validationError}</p>
      )}

      {createRuleState?.error && (
        <p className="text-sm text-red-500">{createRuleState.error}</p>
      )}

      <Button type="submit" disabled={!!validationError}>
        Create Cursor Rule
      </Button>
    </form>
  );
}
