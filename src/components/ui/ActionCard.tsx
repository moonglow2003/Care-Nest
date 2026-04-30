"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export interface ActionCardProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  href?: string;
  variant?: "primary" | "secondary" | "neutral";
}

export const ActionCard = React.forwardRef<HTMLDivElement, ActionCardProps>(
  (
    { className, icon, title, subtitle, href, onClick, variant = "neutral", ...props },
    ref
  ) => {

    const variants = {
      primary:
        "bg-[var(--color-primary-container)] text-white border-transparent",

      secondary:
        "bg-[var(--color-secondary-container)] text-[var(--color-on-secondary)] border-transparent",

      neutral:
        "bg-[var(--color-surface-container)] text-[var(--color-on-surface)] border-[var(--color-outline-variant)] hover:bg-[var(--color-surface-container-high)]",
    };

    const content = (
      <motion.div
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "flex items-center justify-between p-6 rounded-2xl border transition-colors cursor-pointer min-h-14 shadow-sm",
          variants[variant],
          className
        )}
        onClick={onClick}
        {...props}
      >
        <div className="flex items-center gap-4">

          {/* ✅ FIXED ICON BACKGROUND */}
          <div
            className="shrink-0 w-12 h-12 flex items-center justify-center rounded-full 
            bg-[var(--color-surface-dim)]"
          >
            {icon}
          </div>

          <div className="flex flex-col">
            <h3 className="text-xl font-bold font-sans text-[var(--color-on-surface)]">
              {title}
            </h3>

            {subtitle && (
              <p
                className={cn(
                  "text-sm opacity-90",
                  variant === "neutral"
                    ? "text-[var(--color-on-surface-variant)]"
                    : "text-white/80"
                )}
              >
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <ChevronRight className="w-6 h-6 opacity-70" />
      </motion.div>
    );

    if (href) {
      return (
        <Link
          href={href}
          className="block w-full focus-visible:outline-none 
          focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-2xl"
        >
          {content}
        </Link>
      );
    }

    return content;
  }
);

ActionCard.displayName = "ActionCard";