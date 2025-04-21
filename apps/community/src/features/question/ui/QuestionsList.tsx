import { getRelativeTimeString } from "@pec/shared";
import Link from "next/link";

import { MarkdownViewer } from "@/shared/components/editor";

import { getQuestions } from "../action";
import type { QuestionWithAuthor } from "../model/types";

export async function QuestionsList() {
  const questions = await getQuestions();

  return (
    <div className="space-y-6">
      {questions.map((question: QuestionWithAuthor) => (
        <Link
          key={question.id}
          href={`/community/questions/${question.id}`}
          className="block"
        >
          <div className="rounded-lg border p-6 transition-colors hover:border-primary">
            <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="mb-2 text-xl font-semibold">{question.title}</h2>
                <div className="mb-4 flex flex-wrap gap-2 text-sm text-muted-foreground">
                  <span>{question.author.username}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{getRelativeTimeString(question.created_at)}</span>
                  <span className="hidden sm:inline">•</span>
                  <span
                    className={
                      question.solved ? "text-green-600" : "text-yellow-600"
                    }
                  >
                    {question.solved ? "Solved" : "Unsolved"}
                  </span>
                </div>
              </div>
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span>{question.views_count} views</span>
                <span>{question.likes_count} likes</span>
                <span>{question.comments_count} answers</span>
              </div>
            </div>
            <MarkdownViewer content={question.content} />
          </div>
        </Link>
      ))}
    </div>
  );
}
