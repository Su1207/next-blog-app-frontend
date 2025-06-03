"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import Link from "next/link";
import { toast } from "sonner";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState(""); // If your backend accepts name
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup } = useAuthStore();

  const handleSignup = async () => {
    setLoading(true);
    const result = await signup(email, password, name);

    if (result.success) {
      toast("Signup successful!", {
        description: `Welcome, ${name}.`,
        duration: 3000,
      });
      router.push("/dashboard");
    } else {
      setError(result.error || "Signup failed");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Sign Up</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <Input
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button onClick={handleSignup} disabled={loading} className="w-full">
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
          <p className="text-sm text-center mt-2">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
