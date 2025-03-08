"use client";

import { Button } from "@/shared/ui/button";
import { Label } from "@/shared/ui/label";
import { useCreateCursorRuleActionState } from "../model/useCreateCursorRuleActionState";
import { Textarea } from "@/shared/ui/textarea";

export function CreateCursorRuleForm() {
  const { createRuleState, createRuleAction } =
    useCreateCursorRuleActionState();

  return (
    <form action={createRuleAction} className="space-y-4">
      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          required
          rows={15}
          placeholder="Enter cursor rule content"
          className="font-mono"
        />
      </div>

      {createRuleState?.error && (
        <p className="text-sm text-red-500">{createRuleState.error}</p>
      )}

      <Button type="submit">Create Cursor Rule</Button>
    </form>
  );
}
