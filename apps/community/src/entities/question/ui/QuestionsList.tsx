import { getRelativeTimeString, PostCardSkeleton } from "@packages/ui";
import Link from "next/link";
import { Suspense } from "react";

import { getPosts } from "@/entities/post";
import { MarkdownViewer } from "@/shared/components/editor";

export async function QuestionsListContent() {
  const questions = await getPosts("question");

  return (
    <>
      {questions.map((question) => (
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
    </>
  );
}

export function QuestionsList() {
  return (
    <div className="space-y-6">
      <Suspense fallback={<PostCardSkeleton count={3} variant="question" />}>
        <QuestionsListContent />
      </Suspense>
    </div>
  );
}
