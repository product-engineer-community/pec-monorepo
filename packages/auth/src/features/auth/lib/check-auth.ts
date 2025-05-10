"use server";

import { getAuthSession } from "@packages/supabase";

export const getIsAuthenticated = async () => {
  const user = await getAuthSession();
  return !!user;
};
