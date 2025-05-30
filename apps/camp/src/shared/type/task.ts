export interface TaskData {
  userId: string;
  week: number;
  taskType:
    | "join_regular_session"
    | "download_regular_session_guide"
    | "read_regular_session_guide"
    | "assignment"
    | "assignment_checklist";
  value?: string;
  valueType?: "boolean" | "string";
  assignmentOrder?: number | null;
}
