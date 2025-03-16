import { z } from "zod";

// User Schema
export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  username: z.string().min(3).max(50),
  avatar_url: z.string().url().nullish(),
  role: z.enum(["subscriber", "participant", "manager"]).default("participant"),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

// Post Types
export const postType = z.enum(["post", "question", "discussion"]);
export type PostType = z.infer<typeof postType>;

// Base Post Schema (공통 필드)
const basePostSchema = {
  id: z.string().uuid(),
  type: postType,
  title: z.string().min(5).max(200),
  content: z.string().min(10),
  author_id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  likes_count: z.number().default(0),
  comments_count: z.number().default(0),
  views_count: z.number().default(0),
};

// Post Schema
export const postSchema = z.object({
  ...basePostSchema,
  type: z.literal("post"),
  thumbnail_url: z.string().url().nullish(),
  category: z.string().optional(),
});

// Question Schema
export const questionSchema = z.object({
  ...basePostSchema,
  type: z.literal("question"),
  solved: z.boolean().default(false),
  answer_id: z.string().uuid().nullish(),
});

// Discussion Schema
export const discussionSchema = z.object({
  ...basePostSchema,
  type: z.literal("discussion"),
  category: z.string(),
  tags: z.array(z.string()).optional(),
});

// Combined Post Schema (모든 타입의 포스트를 포함)
export const combinedPostSchema = z.discriminatedUnion("type", [
  postSchema,
  questionSchema,
  discussionSchema,
]);

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
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  attendees_count: z.number().default(0),
});

export type User = z.infer<typeof userSchema>;
export type Post = z.infer<typeof postSchema>;
export type Question = z.infer<typeof questionSchema>;
export type Discussion = z.infer<typeof discussionSchema>;
export type CombinedPost = z.infer<typeof combinedPostSchema>;
export type Comment = z.infer<typeof commentSchema>;
export type Like = z.infer<typeof likeSchema>;
export type Event = z.infer<typeof eventSchema>;
