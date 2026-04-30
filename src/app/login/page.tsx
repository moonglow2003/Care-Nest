"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/dashboard");
        router.refresh();
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
        
        <h1 className="text-3xl font-bold font-sans text-on-surface mb-2">Welcome Back</h1>
        <p className="text-on-surface-variant mb-10 text-center">
          Sign in to access your health dashboard and manage appointments.
        </p>

        {error && <p className="text-error text-sm mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="w-full flex flex-col gap-2">
          <Input 
            name="email"
            type="email" 
            label="Email Address" 
            defaultValue="user@carenest.com" 
            required 
          />
          <Input 
            name="password"
            type="password" 
            label="Password" 
            defaultValue="password123" 
            required 
          />
          
          <div className="flex justify-end mb-6 mt-2">
            <a href="#" className="text-sm font-semibold text-primary hover:text-primary-container">
              Forgot password?
            </a>
          </div>

          <Button type="submit" className="w-full" isLoading={isLoading}>
            Sign In
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-on-surface-variant">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="font-semibold text-primary hover:text-primary-container">
            Create account
          </a>
        </div>
      </motion.div>
    </div>
  );
}
