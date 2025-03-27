"use client";

import { useState } from "react";
import Link from "next/link";
import { Spinner } from "@heroui/spinner";

interface LoadingLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  spinnerPosition?: "top-right" | "center" | "overlay";
  spinnerSize?: "sm" | "md" | "lg";
  spinnerColor?: "primary" | "secondary" | "success" | "warning" | "danger";
}

export function LoadingLink({
  href,
  children,
  className = "",
  spinnerPosition = "top-right",
  spinnerSize = "sm",
  spinnerColor = "primary",
}: LoadingLinkProps) {
  const [isLoading, setIsLoading] = useState(false);

  const positionClasses = {
    "top-right": "absolute top-3 right-3",
    center:
      "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
    overlay:
      "absolute inset-0 flex items-center justify-center bg-background/50",
  };

  return (
    <Link
      className={`block relative ${className}`}
      href={href}
      onClick={() => setIsLoading(true)}
    >
      <div className={isLoading ? "opacity-70 transition-opacity" : ""}>
        {children}
      </div>

      {isLoading && (
        <div className={positionClasses[spinnerPosition]}>
          <Spinner color={spinnerColor} size={spinnerSize} />
        </div>
      )}
    </Link>
  );
}
