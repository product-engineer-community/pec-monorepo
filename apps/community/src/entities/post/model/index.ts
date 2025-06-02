export interface Post {
  id: string;
  title: string;
  category: string | null;
  views_count: number;
  content: string;
  created_at: string;
  solved: boolean | null;
  tags: string[] | null;
  type: string;
  thumbnail_url: string | null;
  author: {
    id: string;
    username: string;
    avatar_url: string;
    role: string;
  };
  comments_count: number;
  likes_count: number;
  is_liked: boolean;
  user_like: {
    id: string;
  }[];
}

export * from "./getPostTypeDisplayName";
