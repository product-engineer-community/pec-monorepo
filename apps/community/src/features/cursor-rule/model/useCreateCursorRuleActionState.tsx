import { createCursorRule } from "@/entities/cursor-rule/api/createCursorRule";
import { useActionState } from "react";
import { redirect } from "next/navigation";
import { nanoid } from "nanoid";

interface CreateCursorRuleState {
  message?: string;
  error?: string;
}

export const useCreateCursorRuleActionState = () => {
  const createRuleWithFormData = async (
    prevState: CreateCursorRuleState,
    formData: FormData,
  ) => {
    const content = formData.get("content") as string;
    const path = nanoid(26);

    const result = await createCursorRule({ path, content });

    if ("error" in result) {
      return { error: result.error };
    }

    redirect(`/cursor-rules/${path}`);
  };

  const [createRuleState, createRuleAction] = useActionState<
    CreateCursorRuleState,
    FormData
  >(createRuleWithFormData, { error: "" });

  return { createRuleState, createRuleAction };
};
