import { Button } from "@heroui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { title } from "@/components/common/primitives";

export default async function FlowNotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="container mx-auto px-6 py-12 text-center">
      <h1 className={title({ size: "sm" })}>{t("flowNotFound.title")}</h1>
      <p className="text-default-500 mt-4 mb-8">
        {t("flowNotFound.description")}
      </p>
      <Button
        as={Link}
        color="primary"
        href="/flows"
        startContent={<ArrowLeft size={18} />}
      >
        {t("backButton")}
      </Button>
    </div>
  );
}
