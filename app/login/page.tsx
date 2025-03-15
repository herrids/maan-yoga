"use server";

import { redirect } from "next/navigation";

import { LoginForm } from "../../components/login/LoginForm";

import { createClient } from "@/utils/supabase/server";

export default async function LoginPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/");
  }

  async function signIn(formData: FormData) {
    "use server";

    const supabase = await createClient();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?error=Invalid credentials");
    }

    return redirect("/");
  }

  async function signUp(formData: FormData) {
    "use server";
    const supabase = await createClient();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?error=Could not sign up");
    }

    return redirect("/login?message=Check email to continue sign in process");
  }

  async function signInWithGoogle() {
    "use server";

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?error=Could not sign in with Google");
    }

    if (data) {
      return redirect(data.url);
    }
  }

  return (
    <LoginForm
      signInAction={signIn}
      signInWithGoogleAction={signInWithGoogle}
      signUpAction={signUp}
    />
  );
}
