import { PostType } from "@pec/ui";

export interface NotifyNewPostOptions {
  postId: string;
  type: PostType;
  title: string;
  content: string;
}
