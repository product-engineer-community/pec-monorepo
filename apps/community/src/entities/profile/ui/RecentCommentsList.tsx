import { getPostTypeDisplayName } from "@packages/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@packages/ui";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

import { getRelativeTime } from "@/shared/libs/date";

import { getUserPostComments } from "../action";

export async function RecentCommentsList({ userId }: { userId: string }) {
  const comments = await getUserPostComments(userId);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          최근 내 글에 달린 댓글
        </CardTitle>
      </CardHeader>
      <CardContent>
        {comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((comment) => (
              <Link
                key={comment.id}
                href={`/post/${comment.post.type}/${comment.post.id}#comment-${comment.id}`}
                className="group block"
              >
                <div className="rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50">
                  <div className="mb-2 flex items-start gap-2">
                    <MessageCircle
                      size={16}
                      className="mt-0.5 shrink-0 text-blue-500"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-sm text-gray-700">
                        {comment.content}
                      </p>
                    </div>
                  </div>

                  <div className="ml-6 text-xs text-gray-500">
                    <span className="font-medium text-gray-700">
                      {comment.post.title}
                    </span>
                    <span className="mx-2">•</span>
                    <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                      {getPostTypeDisplayName(comment.post.type)}
                    </span>
                    <span className="mx-2">•</span>
                    <span>{getRelativeTime(comment.created_at)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-gray-500">
            <MessageCircle className="mx-auto mb-2 h-8 w-8 text-gray-300" />
            <p className="text-sm">최근 댓글이 없습니다.</p>
            <p className="mt-1 text-xs">
              새로운 글을 작성하여 활발한 토론을 시작해보세요!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
