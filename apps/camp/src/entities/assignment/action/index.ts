import { getSupabaseServerClient } from "@packages/supabase";

export async function getAssignmentList(week: number) {
  const supabase = await getSupabaseServerClient();

  const { data, error } = await supabase
    .from("assignment")
    .select("*")
    .eq("week", week);

  if (error) {
    throw new Error(
      `Failed to fetch assignment for week ${week}: ${error.message}`,
    );
  }

  if (!data) {
    throw new Error(`No assignment found for week ${week}`);
  }

  return data.map((assignment) => {
    const { example_image_url, ...rest } = assignment;
    return {
      ...rest,
      exampleImageUrl: example_image_url ?? null,
    };
  });
}
