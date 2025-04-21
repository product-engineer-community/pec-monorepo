import type { Question, Comment } from "@pec/shared";

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

export type CommentWithAuthor = Comment & {
  author: {
    id: string;
    username: string;
    avatar_url: string | null;
    role: string;
  };
  likes_count: number;
  is_liked: boolean;
};
