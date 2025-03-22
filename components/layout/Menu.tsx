"use client";

import { Button, ListboxSection } from "@heroui/react";
import {
  LogOut,
  Menu as MenuIcon,
  User,
  Sun,
  Moon,
  Earth,
  Plus,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { Listbox, ListboxItem } from "@heroui/react";
import { useTheme } from "next-themes";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { useRouter as useI18nRouter } from "@/i18n/navigation";
import { createClient } from "@/utils/supabase/client";
import { trpc } from "@/utils/trpc";

export default function Menu() {
  const { theme, setTheme } = useTheme();
  const locale = useLocale();
  const i18nRouter = useI18nRouter();
  const t = useTranslations("menu");
  const router = useRouter();
  const createFlowMutation = trpc.flow.createFlow.useMutation({
    onSuccess: (data) => {
      router.push(`/flows/${data.id}`);
    },
  });

  const handleSignOut = async () => {
    const supabase = createClient();

    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const handleLanguageChange = () => {
    const newLocale = locale === "en" ? "de" : "en";

    i18nRouter.replace("/", { locale: newLocale });
  };

  const handleCreateFlow = async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user?.email) {
      await createFlowMutation.mutateAsync({
        user_email: user.email,
        name: t("newFlow"),
      });
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button isIconOnly variant="light">
          <MenuIcon size={22} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Listbox>
          <ListboxSection showDivider>
            <ListboxItem
              key="new-flow"
              startContent={<Plus size={22} />}
              onPress={handleCreateFlow}
            >
              {t("newFlow")}
            </ListboxItem>
            <ListboxItem
              key="flows"
              href="/flows"
              startContent={<User size={22} />}
            >
              {t("myFlows")}
            </ListboxItem>
          </ListboxSection>
          <ListboxSection showDivider>
            <ListboxItem
              startContent={
                theme === "light" ? <Moon size={22} /> : <Sun size={22} />
              }
              onPress={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? t("darkMode") : t("lightMode")}
            </ListboxItem>
            <ListboxItem
              key="language"
              startContent={<Earth size={22} />}
              onPress={handleLanguageChange}
            >
              {locale === "en" ? t("german") : t("english")}
            </ListboxItem>
          </ListboxSection>
          <ListboxSection>
            <ListboxItem
              key="logout"
              startContent={<LogOut size={22} />}
              onPress={handleSignOut}
            >
              {t("logout")}
            </ListboxItem>
          </ListboxSection>
        </Listbox>
      </PopoverContent>
    </Popover>
  );
}
