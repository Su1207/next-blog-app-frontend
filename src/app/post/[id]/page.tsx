import { getPostById } from "@/lib/api";
import { Post } from "@/lib/types";

export const dynamic = "force-dynamic"; // SSR

type PostPageProps = {
  params: { id: string };
};

export default async function PostPage({ params }: PostPageProps) {
  const post: Post | null = await getPostById(params.id);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-6 text-center text-red-500">
        Post not found.
      </div>
    );
  }

  return (
    <div className=" mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
      <p className="text-sm text-gray-600 mb-6">
        By <span className="font-medium">{post.authorId.name}</span> on{" "}
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div className="text-gray-800 leading-relaxed whitespace-pre-line">
        {post.content}
      </div>
    </div>
  );
}
