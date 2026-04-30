"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref" | "children"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  isLoading?: boolean;
  children?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "default", isLoading, children, disabled, ...props },
    ref
  ) => {
    const variants = {
      primary: "bg-primary text-on-primary hover:bg-primary-container hover:text-white shadow-sm hover:shadow-md",
      secondary: "bg-secondary text-on-secondary hover:bg-secondary-container hover:text-on-secondary-container shadow-sm hover:shadow-md",
      outline: "border border-outline text-primary hover:bg-surface-container",
      ghost: "text-primary hover:bg-surface-container",
    };

    const sizes = {
      default: "h-14 px-8 py-2 text-lg",
      sm: "h-10 rounded-md px-4 text-sm",
      lg: "h-16 rounded-xl px-10 text-xl",
      icon: "h-14 w-14",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.01, y: -1 }}
        whileTap={{ scale: 0.98, y: 1 }}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-xl font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : null}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
