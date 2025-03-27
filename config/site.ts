export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Yoga Flow App",
  description: "Yoga Flow App",
  navItems: [
    {
      label: "Meine Flows",
      href: "/flows",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    new: "/new",
    flows: "/flows",
    twitter: "https://instagram.com/beyondthepose_",
  },
};
