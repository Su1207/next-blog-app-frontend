import { Post } from "@/lib/types";
import Link from "next/link";

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg  hover:text-white hover:bg-gray-800 hover:scale-105 transition-all duration-300">
      <h2 className="text-2xl font-semibold">{post?.title}</h2>
      <p className="text-sm text-gray-500 mb-2">
        Posted by <span className="font-medium">{post?.authorId.name}</span> on{" "}
        <span className="font-medium">
          {new Date(post?.createdAt).toLocaleDateString()}
        </span>
      </p>
      <p className=" mt-2 line-clamp-3">{post.content}</p>
      <Link
        href={`/post/${post?._id}`}
        className="text-blue-600 hover:underline mt-4 inline-block font-medium"
      >
        Read more →
      </Link>
    </div>
  );
}
