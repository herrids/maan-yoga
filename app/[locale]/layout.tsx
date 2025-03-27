import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

import { Providers } from "../providers";

import { siteConfig } from "@/config/site";
import { fontSerif, fontSans } from "@/config/fonts";
import { Navbar } from "@/components/layout/Navbar";
import { createClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧘</text></svg>",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const t = await getTranslations("legal");

  return (
    <html suppressHydrationWarning lang={locale}>
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSerif.variable,
          fontSans.variable,
        )}
      >
        <Providers
          locale={locale}
          messages={messages}
          themeProps={{ attribute: "class", defaultTheme: "dark" }}
        >
          <div className="relative flex flex-col h-screen">
            <Navbar user={user} />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
            <footer className="w-full flex items-center justify-center py-6 border-t border-neutral-200 dark:border-neutral-800">
              <div className="flex gap-6 text-sm text-neutral-500">
                <Link
                  className="hover:text-primary-600 transition-colors"
                  href={`/${locale}/legal-notice`}
                >
                  {locale === "de" ? "Impressum" : "Legal Notice"}
                </Link>
                <Link
                  className="hover:text-primary-600 transition-colors"
                  href={`/${locale}/data-privacy`}
                >
                  {locale === "de" ? "Datenschutz" : "Privacy Policy"}
                </Link>
                <div className="text-neutral-300 dark:text-neutral-700">
                  ©{new Date().getFullYear()}
                </div>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
