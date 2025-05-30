export type Assignment = {
  id: string;
  week: number;
  title: string;
  checklist: string[] | null;
  exampleImageUrl: string | null;
  order: number | null;
  output: string | null;
  process: string[] | null;
  purpose: string | null;
  tips: string[] | null;
};
