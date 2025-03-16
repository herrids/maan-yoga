import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import { getTranslations } from "next-intl/server";

import { title, subtitle } from "@/components/common/primitives";
import Logo from "@/components/common/Logo";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const t = await getTranslations("home");
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <Logo size={100} />
        <span className={title()}>{t("title1")}</span>
        <br />
        <span className={title()}>{t("title2")}</span>
        <div className={subtitle({ class: "mt-4" })}>{t("description")}</div>
      </div>

      <div className="flex gap-3">
        <Link
          className={buttonStyles({
            variant: "solid",
            color: "primary",
            radius: "full",
          })}
          href={user ? "/flows" : "/login"}
        >
          {user ? t("myFlows") : t("getStarted")}
        </Link>
      </div>
    </section>
  );
}
