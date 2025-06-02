import { getPostTypeDisplayName } from "@packages/constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  PostType,
} from "@packages/ui";
import { Heart, MessageCircle } from "lucide-react";
import Link from "next/link";

import { getPostTypeDescription } from "@/shared/constant/post";
import { getRelativeTime } from "@/shared/libs/date";

import { getPosts } from "../action";
import { Post } from "../model";

interface BoardCardProps {
  type: PostType;
  posts: Post[];
}

function BoardCard({ type, posts }: BoardCardProps) {
  const description = getPostTypeDescription(type);

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold">
          <Link
            href={`/post/${type}`}
            className="transition-colors hover:text-blue-600"
          >
            {getPostTypeDisplayName(type)}
          </Link>
        </CardTitle>
        <CardDescription className="text-sm text-gray-600">
          <div
            className="overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {description}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {posts.length > 0 ? (
            posts.map((post) => (
              <Link
                key={post.id}
                href={`/post/${type}/${post.id}`}
                className="group block"
              >
                <div className="rounded-lg border-b border-zinc-200 p-3 transition-colors hover:bg-gray-50">
                  <h4 className="mb-2 overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium transition-colors group-hover:text-blue-600">
                    {post.title}
                  </h4>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-700">
                        {post.author.username}
                      </span>
                      <span>•</span>
                      <span>{getRelativeTime(post.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-3">
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
            ))
          ) : (
            <div className="py-8 text-center text-gray-500">
              <p className="text-sm">아직 게시글이 없습니다.</p>
              <Link
                href={`/post/${type}/new`}
                className="mt-2 inline-block text-sm text-blue-600 hover:text-blue-700"
              >
                첫 번째 글을 작성해보세요 →
              </Link>
            </div>
          )}

          {posts.length > 0 && (
            <div className="mt-4 pt-3">
              <Link
                href={`/post/${type}`}
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                더 보기 →
              </Link>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export async function CommunityBoards() {
  // 커뮤니티 게시판 타입들 (article 제외)
  const communityTypes: PostType[] = [
    "codereview",
    "FSD",
    "productivity",
    "nextjs",
    "AI",
    "sideproject",
    "learning",
  ];

  // 각 게시판의 최신 글 5개씩 가져오기
  const boardsData = await Promise.all(
    communityTypes.map(async (type) => {
      const posts = await getPosts(type);
      return {
        type,
        posts: posts.slice(0, 4),
      };
    }),
  );

  return (
    <div className="space-y-6">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-3xl font-bold">P.E.C 커뮤니티</h1>
        <p className="mx-auto max-w-2xl text-gray-600">
          개발자들이 함께 성장하는 공간입니다. 다양한 주제의 게시판에서 지식을
          공유하고, 질문하고, 토론해보세요.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {boardsData.map(({ type, posts }) => (
          <BoardCard key={type} type={type} posts={posts} />
        ))}
      </div>
    </div>
  );
}
