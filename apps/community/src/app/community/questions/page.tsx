"use client";

import { Button, getRelativeTimeString, PostCardSkeleton, type Question } from "@pec/shared";
import { getSupabaseClient } from "@pec/supabase";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { MarkdownViewer } from "@/shared/components/editor";

async function getQuestions() {
  const supabase = getSupabaseClient();

  const { data: questions, error: postsError } = await supabase
    .from("posts")
    .select(
      `
      id,
      title,
      content,
      created_at,
      updated_at,
      views_count,
      category,
      tags,
      type,
      author_id,
      solved,
      answer_id,
      author:profiles!posts_author_id_fkey(
        id,
        username,
        avatar_url,
        role
      ),
      comments:comments(count),
      likes:likes(count)
    `,
    )
    .eq("type", "question")
    .order("created_at", { ascending: false });

  if (postsError) {
    console.error("Error fetching questions:", postsError);
    throw postsError;
  }

  return (questions || []).map((question) => ({
    ...question,
    author: Array.isArray(question.author)
      ? question.author[0]
      : question.author,
    comments_count: question.comments?.[0]?.count || 0,
    likes_count: question.likes?.[0]?.count || 0,
    solved: question.solved || false,
    content:
      question.content.length > 300
        ? question.content.slice(0, 300) + "..."
        : question.content,
  })) as (Question & {
    author: {
      id: string;
      username: string;
      avatar_url: string | null;
      role: "subscriber" | "participant" | "manager";
    };
  })[];
}

export default function QuestionsPage() {
  const { data: questions, isLoading } = useQuery({
    queryKey: ["questions"],
    queryFn: getQuestions,
  });

  return (
    <div className="container py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Questions</h1>
        <Link
          href={{
            pathname: "/community/create",
            query: { type: "question" },
          }}
        >
          <Button>Ask Question</Button>
        </Link>
      </div>

      <div className="space-y-6">
        {isLoading ? (
          <PostCardSkeleton variant="question" />
        ) : (
          questions?.map((question) => (
            <Link
              key={question.id}
              href={`/community/questions/${question.id}`}
              className="block"
            >
              <div className="rounded-lg border p-6 transition-colors hover:border-primary">
                <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="mb-2 text-xl font-semibold">
                      {question.title}
                    </h2>
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
          ))
        )}
      </div>
    </div>
  );
}
