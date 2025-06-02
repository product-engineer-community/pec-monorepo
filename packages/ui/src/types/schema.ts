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
export const postType = z.enum([
  "article",
  "AI",
  "learning",
  "sideproject",
  "productivity",
  "nextjs",
  "FSD",
  "codereview",
]);
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
  type: z.literal("article"),
  thumbnail_url: z.string().url().nullish(),
  category: z.string().optional(),
});

// Productivity Schema
export const productivitySchema = z.object({
  ...basePostSchema,
  type: z.literal("productivity"),
  // category: z.string().optional(), // Example: if productivity posts have categories
  // solved: z.boolean().default(false), // Example: if they can be "solved"
});

// Next.js Schema
export const nextjsSchema = z.object({
  ...basePostSchema,
  type: z.literal("nextjs"),
  // category: z.string().optional(), // Example: if next.js posts have categories
  // tags: z.array(z.string()).optional(), // Example: if they have tags
});

// F.S.D Schema
export const fsdSchema = z.object({
  ...basePostSchema,
  type: z.literal("FSD"),
  // category: z.string().optional(), // Example: if F.S.D posts have categories
  // tags: z.array(z.string()).optional(), // Example: if they have tags
});

export const sideprojectSchema = z.object({
  ...basePostSchema,
  type: z.literal("sideproject"),
  // category: z.string().optional(), // Example: if sideproject posts have categories
  // tags: z.array(z.string()).optional(), // Example: if they have tags
});

export const learningSchema = z.object({
  ...basePostSchema,
  type: z.literal("learning"),
  // category: z.string().optional(), // Example: if learning posts have categories
  // tags: z.array(z.string()).optional(), // Example: if they have tags
});

export const aiSchema = z.object({
  ...basePostSchema,
  type: z.literal("AI"),
  // category: z.string().optional(), // Example: if learning posts have categories
  // tags: z.array(z.string()).optional(), // Example: if they have tags
});

export const codereviewSchema = z.object({
  ...basePostSchema,
  type: z.literal("codereview"),
  // category: z.string().optional(), // Example: if codereview posts have categories
  // tags: z.array(z.string()).optional(), // Example: if they have tags
});

// Combined Post Schema (모든 타입의 포스트를 포함)
export const combinedPostSchema = z.discriminatedUnion("type", [
  postSchema,
  productivitySchema,
  nextjsSchema,
  fsdSchema,
  sideprojectSchema,
  learningSchema,
  aiSchema,
  codereviewSchema,
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
export type ProductivityPost = z.infer<typeof productivitySchema>;
export type NextjsPost = z.infer<typeof nextjsSchema>;
export type FsdPost = z.infer<typeof fsdSchema>;
export type CombinedPost = z.infer<typeof combinedPostSchema>;
export type Comment = z.infer<typeof commentSchema>;
export type Like = z.infer<typeof likeSchema>;
export type Event = z.infer<typeof eventSchema>;
