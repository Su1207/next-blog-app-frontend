import { useAuthStore } from "./store/authStore";
import { Post } from "./types";

export async function getAllPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/posts`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  const data = await res.json();
  return data.posts;
}

export async function getPostById(id: string): Promise<Post | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blogs/post/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) return null;

  const data = await res.json();
  return data.post;
}

const { token } = useAuthStore.getState();

export async function fetchUserPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/getPost`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch user posts");
  }
  return data.posts;
}
