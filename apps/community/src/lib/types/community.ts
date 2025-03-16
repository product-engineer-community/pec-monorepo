import { type Question as BaseQuestion, type Discussion as BaseDiscussion, type User } from "@pec/shared";

export interface QuestionWithAuthor extends BaseQuestion {
  author: User;
}

export interface DiscussionWithAuthor extends BaseDiscussion {
  author: User;
}
