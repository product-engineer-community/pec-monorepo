"use client";

import { Button } from "@pec/shared";
import { ArrowUpIcon, ArrowDownIcon, MessageSquareIcon } from "lucide-react";
import Link from "next/link";
import { type QuestionWithAuthor } from "@/lib/types/community";
import { MarkdownViewer } from "@/shared/components/editor";

const MOCK_QUESTIONS: QuestionWithAuthor[] = [
  {
    id: "1",
    type: "question",
    title: "How do I reverse a string in Python?",
    content: "# Reversing a string in Python\n\nI'm trying to reverse a string in Python. What's the most efficient way to do this?\n\n```python\nmy_string = 'hello'\nreversed_string = my_string[::-1]\nprint(reversed_string)\n```",
    author_id: "1",
    author: {
      id: "1",
      email: "user@example.com",
      username: "pythondev",
      role: "participant",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    likes_count: 5,
    comments_count: 1,
    views_count: 10,
    solved: false,
    answer_id: null,
  },
];

export default function QuestionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Questions</h1>
        <div className="flex justify-end">
          <Link href="/community/create?type=question">
            <Button>Ask Question</Button>
          </Link>
        </div>
      </div>
      <div className="space-y-4">
        {MOCK_QUESTIONS.map((question) => (
          <div
            key={question.id}
            className="flex gap-4 p-4 border rounded-lg bg-card hover:border-primary/50 transition-colors"
          >
            <div className="flex flex-col items-center gap-1 min-w-[60px]">
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <ArrowUpIcon className="h-4 w-4" />
              </Button>
              <span className="text-lg font-medium">{question.likes_count}</span>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <ArrowDownIcon className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1">
              <Link
                href={`/community/questions/${question.id}`}
                className="text-lg font-medium hover:text-primary"
              >
                {question.title}
              </Link>
              <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                <MessageSquareIcon className="h-4 w-4" />
                <span>{question.comments_count} answers</span>
              </div>
              <MarkdownViewer content={question.content} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
