import { BaseLayout } from "@/shared/layouts/base-layout";
import { PostCard } from "@/features/post/ui/post-card";

export default function HomePage() {
  return (
    <BaseLayout>
      {/* 그리드 레이아웃 - 모바일: 1열, 태블릿: 2열, PC: 3열 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <PostCard key={i} />
        ))}
      </div>
    </BaseLayout>
  );
}
