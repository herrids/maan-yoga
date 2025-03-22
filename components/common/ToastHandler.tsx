"use client";
import { useEffect } from "react";
import { addToast, ToastProvider } from "@heroui/react";

export function ToastHandler({
  type = "info",
  title,
  message,
  placement = "top-right",
}: {
  type?: "error" | "success" | "warning" | "info";
  title: string;
  message?: string;
  placement?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) {
  useEffect(() => {
    if (type === "error") {
      addToast({ title: title, description: message, color: "danger" });
    }
    if (type === "success") {
      addToast({ title: title, description: message, color: "success" });
    }
    if (type === "warning") {
      addToast({ title: title, description: message, color: "warning" });
    }
    if (type === "info") {
      addToast({ title: title, description: message, color: "default" });
    }
  }, [type, title, message]);

  return <ToastProvider placement={placement} />;
}
