export interface Comment {
  id: string;
  content: string;
  created_at: string;
  updated_at?: string;
  post_id: string;
  author_id: string;
  parent_id: string | null;
}

export interface CommentWithAuthor extends Comment {
  author: {
    id: string;
    username: string;
    avatar_url: string | null;
    role: string;
  };
  likes_count: number;
  is_liked: boolean;
  replies?: CommentWithAuthor[];
}

export interface GroupedComment {
  comment: CommentWithAuthor;
  replies: CommentWithAuthor[];
}

export type GroupedComments = Record<string, GroupedComment>;
