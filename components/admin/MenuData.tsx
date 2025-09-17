import { Image, LayoutDashboard, type LucideIcon, Users } from "lucide-react";

export interface MenuItem {
  label: string;
  href: string;
  icon?: LucideIcon;
  roles: string[];
  subItems?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    label: "Summary",
    href: "/admin",
    icon: LayoutDashboard,
    roles: ["SUPERADMIN"],
  },
  {
    label: "Posts",
    href: "/admin/post",
    icon: Image,
    roles: ["SUPERADMIN"],
  },
  {
    label: "Users",
    href: "/admin/user",
    icon: Users,
    roles: ["SUPERADMIN"],
  },
];

export default menuItems;
