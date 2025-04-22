import { DiscussionsHeader, DiscussionsList } from "@/features/discussion";

export default function DiscussionsPage() {
  return (
    <div className="container py-6">
      <DiscussionsHeader />
      <DiscussionsList />
    </div>
  );
}
