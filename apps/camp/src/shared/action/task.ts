"use server";

import { getSupabaseServerClient } from "@packages/supabase";

import { TaskData } from "../type/task";

export async function getTask({
  userId,
  week,
  taskType,
  assignmentOrder,
}: TaskData) {
  const supabase = await getSupabaseServerClient();
  const { data, error } = await supabase
    .from("task")
    .select("*")
    .eq("user_id", userId)
    .eq("week", week)
    .eq("task_type", taskType)
    .filter("assignment_order", "eq", assignmentOrder ?? null);

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
  assignmentOrder = null,
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
      assignment_order: assignmentOrder,
    })
    .select();

  if (error) throw new Error(error.message);

  return data;
}
