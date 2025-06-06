import { Suspense } from "react";

import {
  getProfile,
  ProfileHeader,
  RecentCommentsList,
  RecentCommentsListSkeleton,
  UserPostsList,
  UserPostsListSkeleton,
} from "@/entities/profile";

export default async function ProfilePage() {
  const profile = await getProfile();

  return (
    <div className="container mx-auto max-w-4xl space-y-8 p-6">
      <ProfileHeader profile={profile} />

      <div className="grid gap-8 lg:grid-cols-2">
        <Suspense fallback={<UserPostsListSkeleton />}>
          <UserPostsList userId={profile.id} />
        </Suspense>
        <Suspense fallback={<RecentCommentsListSkeleton />}>
          <RecentCommentsList userId={profile.id} />
        </Suspense>
      </div>
    </div>
  );
}
