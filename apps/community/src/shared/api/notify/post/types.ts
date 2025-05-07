import { PostType } from "@packages/ui";

export interface NotifyNewPostOptions {
  postId: string;
  type: PostType;
  title: string;
  content: string;
}
