import { getAuthSession } from "@packages/supabase";
import { notFound } from "next/navigation";

import { getPost } from "@/entities/post/action";
import { MarkdownViewer } from "@/shared/components/editor";
import { getRelativeTime } from "@/shared/libs/date";

interface ArticleDetailProps {
  id: string;
  deleteButton?: React.ReactNode;
  postLikeButton?: React.ReactNode;
  editButton?: React.ReactNode;
}

export async function ArticleDetail({
  id,
  deleteButton,
  postLikeButton,
  editButton,
}: ArticleDetailProps) {
  const article = await getPost(id);

  if (!article) {
    return notFound();
  }

  const session = await getAuthSession();
  const isAuthor = session?.user?.id === article.author.id;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
            {article.author.username?.[0]?.toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">
              {article.author.username}
            </span>
            <span className="text-xs text-gray-500">
              {getRelativeTime(article.created_at)}
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
        <h1 className="mb-4 text-2xl font-bold">{article.title}</h1>
        <MarkdownViewer content={article.content} />
      </div>
    </div>
  );
}
