"use client";

import { Button } from "@pec/shared";
import { HeartIcon, ShareIcon, MessageSquareIcon } from "lucide-react";
import Link from "next/link";
import { type DiscussionWithAuthor } from "@/lib/types/community";
import { Avatar } from "@/shared/components/avatar";
import { getRelativeTimeString } from "@pec/shared";
import { MarkdownViewer } from "@/shared/components/editor";

const MOCK_DISCUSSIONS: DiscussionWithAuthor[] = [
  {
    id: "1",
    type: "discussion",
    title: "What Would You Like to See Here?",
    content: "# What Would You Like to See Here?\n\nLet's brainstorm together! If you could add any new feature to our forum, what would it be? Looking for ideas that would make your experience here even better.",
    author_id: "1",
    author: {
      id: "1",
      email: "jessica@example.com",
      username: "Jessica Harris",
      avatar_url: null, 
      role: "participant",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    likes_count: 0,
    comments_count: 0,
    views_count: 0,
    category: "general",
    tags: ["feedback", "feature-request"],
  },
];

export default function DiscussionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Discussions</h1>
        <div className="flex justify-end">
          <Link href="/community/create?type=discussion">
            <Button>New Discussion</Button>
          </Link>
        </div>
      </div>
      <div className="space-y-4">
        {MOCK_DISCUSSIONS.map((discussion) => (
          <div
            key={discussion.id}
            className="p-4 border rounded-lg bg-card hover:border-primary/50 transition-colors"
          >
            <div className="flex items-center gap-3 mb-3">
              <Avatar 
                src={discussion.author.avatar_url}
                alt={discussion.author.username}
              />
              <div>
                <div className="font-medium">{discussion.author.username}</div>
                <div className="text-sm text-muted-foreground">
                  {getRelativeTimeString(discussion.created_at)}
                </div>
              </div>
            </div>
            <Link
              href={`/community/discussions/${discussion.id}`}
              className="block hover:text-primary"
            >
              <h2 className="text-lg font-medium mb-2">{discussion.title}</h2>
            </Link>
            <MarkdownViewer content={discussion.content} />
            <div className="flex gap-4 mt-4">
              <Button variant="ghost" size="sm" className="gap-2">
                <HeartIcon className="h-4 w-4" />
                <span>{discussion.likes_count}</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <MessageSquareIcon className="h-4 w-4" />
                <span>{discussion.comments_count}</span>
              </Button>
              <Button variant="ghost" size="sm">
                <ShareIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
