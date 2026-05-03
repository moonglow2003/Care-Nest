"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { HeartPulse } from "lucide-react";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login after 2 seconds
    const timer = setTimeout(() => {
      router.push("/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-primary min-h-screen text-white">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        className="flex flex-col items-center gap-6"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="bg-white/20 p-8 rounded-full"
        >
          <HeartPulse size={64} className="text-white" />
        </motion.div>
        <h1 className="text-4xl font-bold font-sans tracking-tight">Care Nest</h1>
        <p className="text-primary-fixed-dim text-lg mt-2">Your Health Companion</p>
      </motion.div>
    </div>
  );
}
