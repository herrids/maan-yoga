import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { Logo } from "@/components/icons";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <Logo size={150} />
        <span className={title()}>Your Practice,</span>
        <br />
        <span className={title()}>Your Path</span>
        <div className={subtitle({ class: "mt-4" })}>
          Simple, intuitive and personalized yoga flow builder.
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          className={buttonStyles({
            variant: "solid",
            color: "primary",
            radius: "full",
          })}
          href={siteConfig.links.flows}
        >
          Your Flows
        </Link>
      </div>
    </section>
  );
}
