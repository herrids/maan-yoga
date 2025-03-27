"use server";

import { redirect } from "next/navigation";

import { LoginForm } from "@/components/auth/LoginForm";
import { createClient } from "@/utils/supabase/server";

export default async function LoginPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/");
  }

  return (
    <>
      <LoginForm />
    </>
  );
}
