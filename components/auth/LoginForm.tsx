"use client";

import { Card } from "@heroui/react";
import { Input } from "@heroui/react";
import { Button } from "@heroui/react";
import { useTranslations } from "next-intl";
import { useSearchParams, useRouter } from "next/navigation";
import { addToast } from "@heroui/react";

export function LoginForm() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const router = useRouter();
  const error = searchParams.get("error");
  const message = searchParams.get("message");

  const signInHandler = async (formData: FormData) => {
    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to sign in");
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      addToast({
        title: t("login.errorSignIn"),
        description:
          error instanceof Error ? error.message : "An error occurred",
        color: "danger",
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const response = await fetch("/api/auth/google");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to initiate Google sign in");
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      addToast({
        title: t("login.errorSignIn"),
        description:
          error instanceof Error ? error.message : "An error occurred",
        color: "danger",
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center py-2">
      {message && <div className="mb-4 text-sm text-green-600">{message}</div>}
      <Card className="w-full max-w-md p-8">
        <div className="mb-8">
          <h2 className="text-center text-3xl font-bold tracking-tight">
            {t("login.title")}
          </h2>
        </div>
        <form action={signInHandler} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium" htmlFor="email">
                {t("login.email")}
              </label>
              <Input
                required
                className="mt-1 block w-full"
                id="email"
                name="email"
                placeholder={t("login.emailPlaceholder")}
                type="email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium" htmlFor="password">
                {t("login.password")}
              </label>
              <Input
                required
                className="mt-1 block w-full"
                id="password"
                name="password"
                placeholder={t("login.passwordPlaceholder")}
                type="password"
              />
            </div>
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <div>
            <Button className="w-full" type="submit">
              {t("login.signIn")}
            </Button>
          </div>
        </form>

        <div className="mt-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                {t("login.orContinueWith")}
              </span>
            </div>
          </div>

          <div className="mt-4">
            <Button
              className="w-full flex items-center justify-center gap-2"
              type="button"
              variant="bordered"
              onPress={handleGoogleSignIn}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              {t("login.signInWithGoogle")}
            </Button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm">
            {t("login.noAccount")}
            <br />
            <Button
              as="a"
              className="font-medium"
              href="/signup"
              variant="light"
            >
              {t("login.signUp")}
            </Button>
          </p>
        </div>
      </Card>
    </div>
  );
}
