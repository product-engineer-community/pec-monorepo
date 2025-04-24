import type { Question } from "@pec/shared";

export type QuestionWithAuthor = Question & {
  author: {
    id: string;
    username: string;
    avatar_url: string | null;
    role: "subscriber" | "participant" | "manager";
  };
  comments_count: number;
  likes_count: number;
};
