import type { Metadata } from "next";
import { getPosts } from "@/entities/post"; // Assuming getPosts is the correct action
import { postType as postTypeSchema } from "@packages/ui"; // Import postTypeSchema

// TODO: Replace with actual F.S.D components or generic PostList components
// import { FSDHeader, FSDList } from "@/entities/fsd";

export const metadata: Metadata = {
  title: "F.S.D",
  description:
    "F.S.D (Full Stack Development) 관련 게시물을 찾아보세요. 질문하고, 지식을 공유하며 토론하세요.",
  openGraph: {
    title: "F.S.D | PEC 커뮤니티",
    description:
      "F.S.D (Full Stack Development) 관련 게시물을 찾아보세요. 질문하고, 지식을 공유하며 토론하세요.",
    images: ["/logo.webp"],
    type: "website",
  },
};

export default async function FSDPage() {
  // Fetch posts for the "FSD" type
  const posts = await getPosts(postTypeSchema.Enum.FSD);

  return (
    <div className="container py-6">
      {/* <FSDHeader /> */}
      {/* <FSDList posts={posts} /> */}
      <h1>F.S.D Posts</h1>
      <p>Posts related to F.S.D will be displayed here.</p>
      {posts && posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <a href={`/community/fsd/${post.id}`}>{post.title}</a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No F.S.D posts found.</p>
      )}
    </div>
  );
}
