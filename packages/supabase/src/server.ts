import { createServerClient } from "@supabase/ssr";
import type { Database } from "./types";

export async function getSupabaseServer(cookieStore: any) {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set(name, value, options);
          } catch (error) {
            // Handle cookie error
          }
        },
      },
    }
  );
}
