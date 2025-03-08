import { z } from "zod";

// User Schema
export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  username: z.string().min(3).max(50),
  avatar_url: z.string().url().nullish(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

// Community Schema
export const communitySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3).max(100),
  description: z.string().min(10).max(500),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

// Post Schema
export const postSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(5).max(200),
  content: z.string().min(10),
  author_id: z.string().uuid(),
  community_id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  likes_count: z.number().default(0),
  comments_count: z.number().default(0),
});

// Comment Schema
export const commentSchema = z.object({
  id: z.string().uuid(),
  content: z.string().min(1),
  post_id: z.string().uuid(),
  author_id: z.string().uuid(),
  parent_id: z.string().uuid().nullish(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  likes_count: z.number().default(0),
});

// Like Schema
export const likeSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  post_id: z.string().uuid().nullish(),
  comment_id: z.string().uuid().nullish(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

// Event Schema
export const eventSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(5).max(100),
  description: z.string().min(10),
  start_date: z.string().datetime(),
  end_date: z.string().datetime(),
  community_id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  attendees_count: z.number().default(0),
});

export type User = z.infer<typeof userSchema>;
export type Community = z.infer<typeof communitySchema>;
export type Post = z.infer<typeof postSchema>;
export type Comment = z.infer<typeof commentSchema>;
export type Like = z.infer<typeof likeSchema>;
export type Event = z.infer<typeof eventSchema>;
