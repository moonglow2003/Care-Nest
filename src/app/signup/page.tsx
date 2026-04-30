"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        router.push("/login");
      } else {
        const data = await res.json();
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center px-6 py-12 bg-surface min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm mx-auto flex flex-col items-center"
      >
        <div className="bg-primary/10 p-6 rounded-full mb-8">
          <HeartPulse size={48} className="text-primary" />
        </div>
        
        <h1 className="text-3xl font-bold font-sans text-on-surface mb-2">Create Account</h1>
        <p className="text-on-surface-variant mb-10 text-center">
          Join Care Nest to personalize your healthcare experience.
        </p>

        {error && <p className="text-error text-sm mb-4">{error}</p>}

        <form onSubmit={handleSignup} className="w-full flex flex-col gap-2">
          <Input 
            name="name"
            type="text" 
            label="Full Name" 
            placeholder="John Doe" 
            required 
          />
          <Input 
            name="email"
            type="email" 
            label="Email Address" 
            placeholder="user@carenest.com" 
            required 
          />
          <Input 
            name="password"
            type="password" 
            label="Password" 
            placeholder="password123" 
            required 
          />
          
          <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
            Sign Up
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-on-surface-variant">
          Already have an account?{" "}
          <a href="/login" className="font-semibold text-primary hover:text-primary-container">
            Sign in
          </a>
        </div>
      </motion.div>
    </div>
  );
}
