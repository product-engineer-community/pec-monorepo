"use server";

import { getSupabaseServerClient } from "@packages/supabase";

import { TaskData } from "../type/task";

export async function getTask({ userId, week, taskType }: TaskData) {
  const supabase = await getSupabaseServerClient();
  const { data, error } = await supabase
    .from("task")
    .select("*")
    .eq("user_id", userId)
    .eq("week", week)
    .eq("task_type", taskType);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function completeTask({
  userId,
  week,
  taskType,
  value = "true",
  valueType = "boolean",
}: TaskData) {
  const supabase = await getSupabaseServerClient();
  const { data, error } = await supabase
    .from("task")
    .upsert({
      user_id: userId,
      week: week,
      task_type: taskType,
      value: value,
      value_type: valueType,
    })
    .select();

  if (error) throw new Error(error.message);

  return data;
}
