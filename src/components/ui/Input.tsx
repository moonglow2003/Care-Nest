"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(
      props.value || props.defaultValue ? true : false
    );

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasValue(e.target.value.length > 0);
      props.onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value.length > 0);
      props.onChange?.(e);
    };

    const isFloating = isFocused || hasValue;

    return (
      <div className="relative w-full mb-4">
        <motion.label
          initial={false}
          animate={{
            y: isFloating ? -24 : 16,
            scale: isFloating ? 0.85 : 1,
            color: error
              ? "var(--color-error)"
              : isFocused
              ? "var(--color-primary)"
              : "var(--color-outline)",
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute left-4 origin-top-left pointer-events-none text-lg font-medium"
        >
          {label}
        </motion.label>
        <input
          type={type}
          className={cn(
            "flex h-16 w-full rounded-xl border-2 bg-transparent px-4 pt-4 pb-1 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-transparent focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
            error
              ? "border-error focus-visible:border-error"
              : "border-outline-variant focus-visible:border-primary",
            className
          )}
          ref={ref}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm font-medium text-error pl-1">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
