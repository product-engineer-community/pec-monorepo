import { getAuthSession } from "@packages/supabase";
import { getRelativeTimeString } from "@packages/ui";
import { notFound } from "next/navigation";

import { MarkdownViewer } from "@/shared/components/editor";
// Assuming getPost is correctly typed to return a comprehensive Post object
import { getPost } from "@/src/entities/post";

// Define a more generic Post type if not already available from getPost
// For now, assuming getPost returns an object with at least these fields:
// id, title, content, created_at, author: { id, username }, etc.

interface PostDetailProps {
  id: string;
  deleteButton?: React.ReactNode;
  postLikeButton?: React.ReactNode;
  editButton?: React.ReactNode;
}

export async function PostDetail({
  id,
  deleteButton,
  postLikeButton,
  editButton,
}: PostDetailProps) {
  // Fetch post data
  const post = await getPost(id);

  // Post not found
  if (!post) {
    notFound();
  }

  const session = await getAuthSession();
  const isAuthor = session?.user?.id === post.author.id;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
            {post.author.username?.[0]?.toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">
              {post.author.username}
            </span>
            <span className="text-xs text-gray-500">
              {getRelativeTimeString(post.created_at)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isAuthor && editButton}
          {isAuthor && deleteButton}
          {postLikeButton}
        </div>
      </div>
      <div>
        <h1 className="mb-4 text-2xl font-bold">{post.title}</h1>
        <MarkdownViewer content={post.content} />
      </div>
    </div>
  );
}
