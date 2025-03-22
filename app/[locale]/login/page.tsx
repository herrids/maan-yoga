"use server";

import { redirect } from "next/navigation";

import { LoginForm } from "@/components/auth/LoginForm";
import { createClient } from "@/utils/supabase/server";
import { ToastHandler } from "@/components/common/ToastHandler";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{
    error?: string;
    message?: string;
  }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/");
  }

  const error = (await searchParams).error;
  const message = (await searchParams).message;

  return (
    <>
      {error && (
        <ToastHandler
          message={error}
          placement="top-right"
          title="Error"
          type="error"
        />
      )}
      {message && (
        <ToastHandler
          message={message}
          placement="top-right"
          title="Success"
          type="success"
        />
      )}
      <LoginForm />
    </>
  );
}
