import { PostType } from "@pec/shared";

export interface NotifyNewPostOptions {
  postId: string;
  type: PostType;
  title: string;
  content: string;
}
