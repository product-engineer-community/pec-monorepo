import { type User } from "@packages/ui";

import type { Post } from "@/entities/post";

export interface Profile extends User {
  points: number;
}

export type UserPost = Post;
