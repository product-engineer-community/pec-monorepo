"use server";
import { getAuthSession } from "@/shared/supabase";

export const getIsAuthenticated = async () => {
  const user = await getAuthSession();
  return !!user;
};
