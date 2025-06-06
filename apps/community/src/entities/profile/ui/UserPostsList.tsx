import { getPostTypeDisplayName } from "@packages/constants";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  PostType,
} from "@packages/ui";
import { Eye, Heart, MessageCircle } from "lucide-react";
import Link from "next/link";

import { getRelativeTime } from "@/shared/libs/date";

import { getUserPosts } from "../action";

export async function UserPostsList({ userId }: { userId: string }) {
  const posts = await getUserPosts(userId);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">내가 쓴 글</CardTitle>
      </CardHeader>
      <CardContent>
        {posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/post/${post.type}/${post.id}`}
                className="group block"
              >
                <div className="rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50">
                  <div className="mb-2 flex items-start justify-between">
                    <h3 className="line-clamp-2 text-sm font-medium transition-colors group-hover:text-blue-600">
                      {post.title}
                    </h3>
                    <span className="ml-2 shrink-0 rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                      {getPostTypeDisplayName(post.type as PostType)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{getRelativeTime(post.created_at)}</span>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Eye size={12} className="text-gray-400" />
                        <span>{post.views_count}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart size={12} className="text-gray-400" />
                        <span>{post.likes_count}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle size={12} className="text-gray-400" />
                        <span>{post.comments_count}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-gray-500">
            <p className="text-sm">아직 작성한 글이 없습니다.</p>
            <Link
              href="/post/write"
              className="mt-2 inline-block text-sm text-blue-600 hover:text-blue-700"
            >
              첫 번째 글을 작성해보세요 →
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
