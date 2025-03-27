import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

import { title, subtitle } from "@/components/common/primitives";
import { createClient } from "@/utils/supabase/server";
import Logo from "@/components/common/Logo";

export default async function Home() {
  const t = await getTranslations("home");
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col items-center w-full">
      <div className="inline-block max-w-xl text-center justify-center">
        <Logo size={100} />
        <span className={title({ size: "md" })}>{t("logoTitle")}</span>
      </div>
      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-2xl">
          <h1 className={title({ size: "lg", class: "text-primary-600" })}>
            {t("heroTitle")}
          </h1>
          <p className={subtitle({ class: "mt-4 text-lg" })}>
            {t("heroSubtitle")}
          </p>

          <div className="flex gap-4 mt-8">
            <Link
              className={buttonStyles({
                variant: "solid",
                color: "primary",
                radius: "full",
                size: "lg",
              })}
              href={user ? "/flows" : "/login"}
            >
              {t("startBuilding")}
            </Link>
          </div>
        </div>

        <div className="relative w-full max-w-md h-[400px] rounded-xl overflow-hidden">
          <Image
            fill
            priority
            alt={t("heroImageAlt")}
            className="object-cover"
            src="/images/hero.jpg"
          />
        </div>
      </section>

      {/* Value Proposition */}
      <section className="w-full bg-neutral-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className={title({ size: "md", class: "text-center mb-12" })}>
            {t("valuePropositionTitle")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {/* Time Saving */}
            <div className="p-6 bg-white dark:bg-neutral-300 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary-600 text-xl">⏱️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t("timeSavingTitle")}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t("timeSavingDesc")}
              </p>
            </div>

            {/* Inspiration */}
            <div className="p-6 bg-white dark:bg-neutral-300 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary-600 text-xl">💡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t("inspirationTitle")}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t("inspirationDesc")}
              </p>
            </div>

            {/* Sequence Creation */}
            <div className="p-6 bg-white dark:bg-neutral-300 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary-600 text-xl">🧘</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t("sequenceTitle")}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t("sequenceDesc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sequence Builder Feature */}
      <section className="w-full max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full max-w-2xl">
            <h2 className={title({ size: "md" })}>{t("builderTitle")}</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              {t("builderDesc")}
            </p>

            <ul className="mt-6 space-y-3">
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">✓</span>
                <span>{t("builderFeature1")}</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">✓</span>
                <span>{t("builderFeature2")}</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">✓</span>
                <span>{t("builderFeature3")}</span>
              </li>
            </ul>

            <div className="mt-8">
              <Link
                className={buttonStyles({
                  variant: "solid",
                  color: "primary",
                  radius: "full",
                })}
                href={user ? "/flows/new" : "/login"}
              >
                {t("tryBuilder")}
              </Link>
            </div>
          </div>

          <div className="relative w-full max-w-md h-[350px] rounded-xl overflow-hidden">
            <Image
              fill
              alt={t("builderImageAlt")}
              className="object-cover"
              src="/images/builder.png"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full bg-neutral-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className={title({ size: "md", class: "text-center mb-2" })}>
            {t("testimonialsTitle")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-3 mb-12 max-w-2xl">
            {t("testimonialsSubtitle")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="p-6 bg-white dark:bg-neutral-300 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden mr-4">
                  <Image
                    alt={t("testimonial1Name")}
                    className="object-cover"
                    height={48}
                    src="/images/nassim.png"
                    width={48}
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{t("testimonial1Name")}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t("testimonial1Title")}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 italic">
                {t("testimonial1Text")}
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="p-6 bg-white dark:bg-neutral-300 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden mr-4">
                  <Image
                    alt={t("testimonial2Name")}
                    className="object-cover"
                    height={48}
                    src="/images/jutta.jpg"
                    width={48}
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{t("testimonial2Name")}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t("testimonial2Title")}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 italic">
                {t("testimonial2Text")}
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="p-6 bg-white dark:bg-neutral-300 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden mr-4">
                  <Image
                    alt={t("testimonial3Name")}
                    className="object-cover"
                    height={48}
                    src="/images/sarah.jpg"
                    width={48}
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{t("testimonial3Name")}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t("testimonial3Title")}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 italic">
                {t("testimonial3Text")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full max-w-7xl mx-auto px-6 py-16 md:py-24 text-center">
        <h2 className={title({ size: "md", class: "mb-4" })}>
          {t("ctaTitle")}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto my-6">
          {t("ctaDesc")}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            className={buttonStyles({
              variant: "solid",
              color: "primary",
              radius: "full",
              size: "lg",
            })}
            href={user ? "/flows" : "/login"}
          >
            {t("startFreeButton")}
          </Link>
        </div>
      </section>
    </div>
  );
}
