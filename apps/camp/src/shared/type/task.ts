export interface TaskData {
  userId: string;
  week: number;
  taskType:
    | "join_regular_session"
    | "download_regular_session_guide"
    | "read_regular_session_guide";
  value?: string;
  valueType?: "boolean" | "string";
}
