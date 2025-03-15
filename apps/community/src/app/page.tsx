import { BaseLayout } from "@/shared/layouts/base-layout";
import { PostCard } from "@/features/post/ui/post-card";

export default function HomePage() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <PostCard key={i} />
      ))}
    </div>
  );
}
