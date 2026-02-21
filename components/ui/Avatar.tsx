"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface AvatarProps {
  src?: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
}

export const Avatar = ({ src, alt, className, fallbackClassName }: AvatarProps) => {
  const [error, setError] = useState(false);

  const initial = alt.charAt(0).toUpperCase();

  if (!src || error) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-full bg-primary text-white font-bold",
          className,
          fallbackClassName
        )}
      >
        {initial}
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden rounded-full", className)}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onError={() => setError(true)}
      />
    </div>
  );
};
