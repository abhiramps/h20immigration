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

  const renderFallback = () => (
    <div
      className={cn(
        "flex items-center justify-center rounded-full text-white font-bold",
        !fallbackClassName?.includes("bg-") && "bg-primary",
        className,
        fallbackClassName
      )}
    >
      {initial}
    </div>
  );

  if (!src || error) {
    return renderFallback();
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
