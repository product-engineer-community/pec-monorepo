"use server";

import { createClient } from "@/shared/utils/supabase/server";
import { User } from "@/entities/user/model/user.interface";

export const login = async ({ email, password }: User) => {
  const supabase = await createClient();

  const { error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (loginError) {
    return { message: `${loginError.message}` };
  }

  return { message: "SUCCESS" };
};
