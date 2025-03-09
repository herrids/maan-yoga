"use client";

import { Button, ListboxSection } from "@heroui/react";
import { LogOut, Menu as MenuIcon, User, Sun, Moon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { Listbox, ListboxItem } from "@heroui/react";
import { useTheme } from "next-themes";

import { createClient } from "@/utils/supabase/client";

export default function Menu() {
  const { theme, setTheme } = useTheme();
  const handleSignOut = async () => {
    const supabase = createClient();

    await supabase.auth.signOut();
    window.location.href = "/";
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
              key="flows"
              href="/flows"
              startContent={<User size={22} />}
            >
              Meine Flows
            </ListboxItem>
          </ListboxSection>
          <ListboxSection showDivider>
            <ListboxItem
              startContent={
                theme === "light" ? <Sun size={22} /> : <Moon size={22} />
              }
              onPress={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? "Light Mode" : "Dark Mode"}
            </ListboxItem>
          </ListboxSection>
          <ListboxSection>
            <ListboxItem
              key="logout"
              startContent={<LogOut size={22} />}
              onPress={handleSignOut}
            >
              Logout
            </ListboxItem>
          </ListboxSection>
        </Listbox>
      </PopoverContent>
    </Popover>
  );
}
