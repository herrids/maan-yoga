import { getTranslations } from "next-intl/server";

import { title } from "@/components/common/primitives";

export default async function Datenschutz() {
  const t = await getTranslations("privacy");

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-12">
      <h1 className={title({ size: "lg", class: "mb-8" })}>
        {t("privacyTitle")}
      </h1>

      <div className="prose max-w-none mt-8">
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{t("privacyIntro")}</h2>
          <p>{t("privacyIntroText")}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{t("dataController")}</h2>
          <p>
            Ferdinand Hoske
            <br />
            Gerichtstr. 19
            <br />
            13347 Berlin
            <br />
            Deutschland
            <br />
            {t("email")}: ferdi@herrids.de
            <br />
            {t("phone")}: 0172 1952439
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{t("dataCollection")}</h2>
          <p>{t("dataCollectionText")}</p>
          <ul className="list-disc ml-6 mt-2">
            <li>{t("dataType1")}</li>
            <li>{t("dataType2")}</li>
            <li>{t("dataType3")}</li>
            <li>{t("dataType4")}</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{t("dataPurpose")}</h2>
          <p>{t("dataPurposeText")}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{t("cookies")}</h2>
          <p>{t("cookiesText")}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{t("userRights")}</h2>
          <p>{t("userRightsText")}</p>
          <ul className="list-disc ml-6 mt-2">
            <li>{t("rightAccess")}</li>
            <li>{t("rightCorrection")}</li>
            <li>{t("rightDeletion")}</li>
            <li>{t("rightRestriction")}</li>
            <li>{t("rightPortability")}</li>
            <li>{t("rightObjection")}</li>
          </ul>
        </section>

        {/* <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{t("lastUpdated")}</h2>
          <p>{new Date().toLocaleDateString()}</p>
        </section> */}
      </div>
    </div>
  );
}
