import { type Discussion as BaseDiscussion, type Question as BaseQuestion, type User } from "@pec/shared";

export interface QuestionWithAuthor extends BaseQuestion {
  author: User;
}

export interface DiscussionWithAuthor extends BaseDiscussion {
  author: User;
}
