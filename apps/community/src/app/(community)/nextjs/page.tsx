import { postType as postTypeSchema } from "@packages/ui"; // Import postTypeSchema
import type { Metadata } from "next";

import { getPosts } from "@/entities/post"; // Assuming getPosts is the correct action

// TODO: Replace with actual Next.js components or generic PostList components
// import { NextjsHeader, NextjsList } from "@/entities/nextjs";

export const metadata: Metadata = {
  title: "Next.js",
  description:
    "Explore posts related to Next.js. Share your projects, ask questions, and discuss best practices.",
  openGraph: {
    title: "Next.js | PEC 커뮤니티",
    description:
      "Explore posts related to Next.js. Share your projects, ask questions, and discuss best practices.",
    images: ["/logo.webp"],
    type: "website",
  },
};

export default async function NextjsPage() {
  // Fetch posts for the "nextjs" type
  const posts = await getPosts(postTypeSchema.Enum.nextjs);

  return (
    <div className="container py-6">
      {/* <NextjsHeader /> */}
      {/* <NextjsList posts={posts} /> */}
      <h1>Next.js Posts</h1>
      <p>Posts related to Next.js will be displayed here.</p>
      {posts && posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <a href={`/community/nextjs/${post.id}`}>{post.title}</a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No Next.js posts found.</p>
      )}
    </div>
  );
}
