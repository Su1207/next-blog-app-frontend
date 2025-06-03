import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/api";
import { Post } from "@/lib/types";

export const dynamic = "force-dynamic"; // Forces SSR

export default async function HomePage() {
  const posts: Post[] = await getAllPosts();

  if (!posts || posts.length === 0) {
    return <main className="p-6">No posts available.</main>;
  }

  return (
    <main>
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </main>
  );
}
