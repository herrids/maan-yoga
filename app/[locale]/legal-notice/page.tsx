import { getTranslations } from "next-intl/server";

import { title } from "@/components/common/primitives";

export default async function Impressum() {
  const t = await getTranslations("legal");

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-12">
      <h1 className={title({ size: "lg", class: "mb-8" })}>
        {t("impressumTitle")}
      </h1>

      <div className="prose max-w-none mt-8">
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{t("companyInfo")}</h2>
          <p>
            Ferdinand Hoske
            <br />
            Gerichtstr. 19
            <br />
            13347 Berlin
            <br />
            Deutschland
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{t("contactInfo")}</h2>
          <p>
            {t("phone")}: 0172 1952439
            <br />
            {t("email")}: ferdi@herrids.de
            <br />
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{t("disclaimerInfo")}</h2>
          <p>{t("disclaimer")}</p>
        </section>
      </div>
    </div>
  );
}
