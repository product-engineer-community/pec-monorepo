import type { Metadata } from "next";
import { getPosts } from "@/entities/post"; // Assuming getPosts is the correct action
import { postType as postTypeSchema } from "@packages/ui"; // Import postTypeSchema

// TODO: Replace with actual Productivity components or generic PostList components
// import { ProductivityHeader, ProductivityList } from "@/entities/productivity";

export const metadata: Metadata = {
  title: "Productivity",
  description:
    "Explore posts related to Productivity. Share tips, ask questions, and improve together.",
  openGraph: {
    title: "Productivity | PEC 커뮤니티",
    description:
      "Explore posts related to Productivity. Share tips, ask questions, and improve together.",
    images: ["/logo.webp"],
    type: "website",
  },
};

export default async function ProductivityPage() {
  // Fetch posts for the "productivity" type
  const posts = await getPosts(postTypeSchema.Enum.productivity);

  return (
    <div className="container py-6">
      {/* <ProductivityHeader /> */}
      {/* <ProductivityList posts={posts} /> */}
      <h1>Productivity Posts</h1>
      <p>Posts related to productivity will be displayed here.</p>
      {posts && posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <a href={`/community/productivity/${post.id}`}>{post.title}</a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No productivity posts found.</p>
      )}
    </div>
  );
}
