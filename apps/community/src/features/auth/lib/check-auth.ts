import { getAuthSession } from "@/src/shared/supabase";

export const getIsAuthenticated = async () => {
  const user = await getAuthSession();
  return !!user;
};
