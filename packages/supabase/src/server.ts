import { createServerClient } from "@supabase/ssr";
import { type Database } from "./types";

export interface CookieOptions {
  get(name: string): string | undefined;
  set(name: string, value: string, options: any): void;
  remove(name: string, options: any): void;
}

export function createServerSupabase(cookies: CookieOptions) {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookies.get(name);
        },
        set(name: string, value: string, options: any) {
          try {
            cookies.set(name, value, options);
          } catch (error) {
            // Handle cookie error
          }
        },
        remove(name: string, options: any) {
          try {
            cookies.remove(name, options);
          } catch (error) {
            // Handle cookie error
          }
        },
      },
    }
  );
}
