"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, FileText, Pill, Calendar, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", icon: Home, label: "Home" },
  { href: "/reports", icon: FileText, label: "Reports" },
  { href: "/medicines", icon: Pill, label: "Meds" },
  { href: "/calendar", icon: Calendar, label: "Calendar" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export function Navigation() {
  const pathname = usePathname();


  // Hide navigation on splash, login, and signup
  if (pathname === "/" || pathname === "/login" || pathname === "/signup") {
    return null;
  }

  return (
    <>


      {/* 📱 Bottom Navigation */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-6 pt-2 
        bg-gradient-to-t from-[var(--color-surface)] via-[var(--color-surface)] to-transparent 
        w-full max-w-md mx-auto"
      >
        <nav
          className="flex items-center justify-around 
          bg-[var(--color-surface)] px-2 py-3 rounded-2xl 
          shadow-lg border border-[var(--color-surface-container)]"
        >
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href ||
              pathname.startsWith(item.href + "/");

            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative flex flex-col items-center justify-center w-16 h-14"
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-primary-container/10 rounded-xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                <Icon
                  className={cn(
                    "w-6 h-6 z-10 transition-colors",
                    isActive ? "text-primary" : "text-outline"
                  )}
                />

                <span
                  className={cn(
                    "text-[10px] font-semibold mt-1 z-10 transition-colors",
                    isActive ? "text-primary" : "text-outline"
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}