"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { SignUpForm } from "@/components/auth/SignUpForm";

export default async function SignUpPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/");
  }

  return <SignUpForm />;
}
