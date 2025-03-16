"use client";

import { Button } from "@pec/shared";
import Link from "next/link";
import { MarkdownViewer } from "@/shared/components/editor";
import { getSupabaseClient } from "@pec/supabase";
import { useQuery } from "@tanstack/react-query";
import { type Question } from "@pec/shared";
import { PostCardSkeleton } from "@pec/shared";

async function getQuestions() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("posts")
    .select(`
      *,
      author:profiles!posts_author_id_fkey(
        id,
        username,
        avatar_url,
        role
      )
    `)
    .eq("type", "question")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
  return data as (Question & { author: { id: string; username: string; avatar_url: string | null; role: string } })[];
}

export default function QuestionsPage() {
  const { data: questions, isLoading } = useQuery({
    queryKey: ["questions"],
    queryFn: getQuestions,
  });

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Questions</h1>
        <Link href="/community/create?type=question">
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
              <div className="border rounded-lg p-6 hover:border-primary transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{question.title}</h2>
                    <div className="flex gap-2 text-sm text-muted-foreground mb-4">
                      <span>{question.author.username}</span>
                      <span>•</span>
                      <span>{new Date(question.created_at).toLocaleDateString()}</span>
                      <span>•</span>
                      <span className={question.solved ? "text-green-600" : "text-yellow-600"}>
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
