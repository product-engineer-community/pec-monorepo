export interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
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
