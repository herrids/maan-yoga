"use client";

import { Card, Input, Button, Alert } from "@heroui/react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
export function LoginForm() {
  const t = useTranslations();
  const router = useRouter();
  const message = useSearchParams().get("message");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (errorMessage) {
      setShowAlert(true);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (message) {
      setSuccessMessage(t(message));
      setShowAlert(true);
    }
  }, [message]);

  const signInHandler = async (formData: FormData) => {
    try {
      setErrorMessage("");
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

      router.push("/flows");
      router.refresh();
    } catch (error) {
      setErrorMessage(t("auth.errorSignIn"));
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setErrorMessage("");
      const response = await fetch("/api/auth/google");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to initiate Google sign in");
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      setErrorMessage(t("auth.errorSignIn"));
    }
  };

  const closerAlertHandler = () => {
    setShowAlert(false);
    setErrorMessage("");
  };

  const AlertComponent = ({
    color,
    message,
  }: {
    color:
      | "default"
      | "primary"
      | "secondary"
      | "success"
      | "warning"
      | "danger";
    message: string;
  }) => {
    return (
      <Alert
        hideIconWrapper
        color={color}
        isVisible={showAlert}
        variant="flat"
        onClose={closerAlertHandler}
      >
        {message}
      </Alert>
    );
  };

  return (
    <div className="flex min-h-screen flex-col items-center py-2">
      <div className="w-full max-w-md p-8">
        {showAlert && errorMessage && (
          <AlertComponent color="danger" message={errorMessage} />
        )}
        {showAlert && successMessage && (
          <AlertComponent color="success" message={successMessage} />
        )}
      </div>

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
              <span className="bg-white dark:bg-neutral-300 px-2 text-gray-500 dark:text-gray-200">
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
