import { useAuthStore } from "./store/authStore";

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

export async function getPostById(id: string) {
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

export async function createPost(title: string, content: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to create post");
  }

  return await res.json();
}

export async function getAuthors() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/authors`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch authors");
  }

  const data = await res.json();
  return data.authors;
}
