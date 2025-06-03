"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { Post } from "@/lib/types";
import { fetchUserPosts } from "@/lib/api";
import PostCard from "@/components/PostCard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ProtectedRoute from "@/components/ProtectedRoute";
import { toast } from "sonner";

export default function DashboardPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const { user, token } = useAuthStore();

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.message || "Failed to create post");
        return;
      }
      toast("Post created successfully!", {
        description: "Your blog post has been created.",
        duration: 3000,
      });
      setTitle("");
      setContent("");
      setShowForm(false);
    } catch (err: unknown) {
      console.error("Error submitting post:", err);
      setError("Error submitting post");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadPosts = async () => {
      if (user && token) {
        const userPosts = await fetchUserPosts();
        await userPosts.sort(
          (a: Post, b: Post) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setPosts(userPosts);
      }
    };

    loadPosts();
  }, [user, token, loading]);

  return (
    <ProtectedRoute>
      <div className=" mx-auto p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h1 className="text-2xl sm:text-3xl font-bold">
              Welcome, {user?.name}
            </h1>
            <p className="text-gray-500">{user?.email}</p>
          </div>
          <div className="flex items-center sm:justify-normal justify-center">
            <Button
              onClick={() => setShowForm((prev) => !prev)}
              className="mt-4 sm:mt-0"
            >
              {showForm ? "Cancel" : "Create Post"}
            </Button>
            <Button
              className="ml-2 mt-4 sm:mt-0"
              onClick={() => useAuthStore.getState().logout()}
            >
              Logout
            </Button>
          </div>
        </div>

        {showForm && (
          <Card className="animate-in fade-in duration-300">
            <CardHeader>
              <CardTitle>Create New Blog</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Blog title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Textarea
                placeholder="Blog content..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full"
              >
                {loading ? "Posting..." : "Post Blog"}
              </Button>
            </CardContent>
          </Card>
        )}

        <div>
          <h2 className="text-2xl font-bold mb-4">Your Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.length === 0 ? (
              <p className="text-gray-500">
                You haven&apos;t posted anything yet.
              </p>
            ) : (
              posts.map((post) => <PostCard key={post._id} post={post} />)
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
