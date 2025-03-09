"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
} from "@heroui/react";
import { Link } from "@heroui/react";
import NextLink from "next/link";
import { Button } from "@heroui/react";
import { User } from "@supabase/supabase-js";

import Logo from "@/components/Logo";
import Menu from "@/components/Menu";

interface NavbarProps {
  user: User;
}

export const Navbar = ({ user }: NavbarProps) => {
  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo size={50} />
            <p className="font-bold text-inherit font-serif text-xl">
              Yoga Flow App
            </p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        {user ? (
          <Menu />
        ) : (
          <Button as={Link} color="primary" href="/login" variant="ghost">
            Login
          </Button>
        )}
      </NavbarContent>
    </HeroUINavbar>
  );
};
