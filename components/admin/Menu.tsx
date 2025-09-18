"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import menuItems, { type MenuItem } from "./MenuData";

const Menu = ({ role }: { role: string }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const toggleDropdown = useCallback(
    (label: string) =>
      setOpenDropdown((prev) => (prev === label ? null : label)),
    [],
  );

  const filteredMenu = useMemo(
    () => menuItems.filter((item) => item.roles.includes(role)),
    [role],
  );
  const isActive = useCallback(
    (href?: string) => {
      if (!href) return false;
      if (href === "/admin/user") {
        return pathname === href || pathname.startsWith("/admin/user/");
      }
      return pathname === href;
    },
    [pathname],
  );

  useEffect(() => {
    for (const item of filteredMenu) {
      if (item.subItems?.some((sub) => isActive(sub.href))) {
        setOpenDropdown(item.label);
        return;
      }
    }
    setOpenDropdown(null);
  }, [filteredMenu, isActive]);

  return (
    <nav className="h-full bg-gray-50 p-4 text-sm text-gray-700 shadow-sm rounded-md">
      <div className="flex flex-col gap-1 overflow-y-auto">
        {filteredMenu.map((item: MenuItem) => {
          const parentActive = isActive(item.href);

          return (
            <div key={item.label} className="rounded-md">
              {item.subItems ? (
                <>
                  <button
                    type="button"
                    onClick={() => toggleDropdown(item.label)}
                    className={`flex w-full items-center justify-between px-3 py-2 rounded-md transition font-medium ${
                      parentActive
                        ? "bg-blue-50 text-blue-600 font-semibold border-l-4 border-blue-500"
                        : openDropdown === item.label
                          ? "bg-gray-100 text-gray-900"
                          : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {item.icon && <item.icon className="h-5 w-5" />}
                      {item.label}
                    </span>
                    {openDropdown === item.label ? (
                      <MdExpandLess className="h-5 w-5 text-gray-500" />
                    ) : (
                      <MdExpandMore className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  {openDropdown === item.label && (
                    <div className="ml-6 mt-1 flex flex-col gap-1 border-l border-gray-200 pl-3">
                      {item.subItems
                        .filter((sub) => sub.roles.includes(role))
                        .map((subItem: MenuItem) => {
                          const subActive = isActive(subItem.href);
                          return (
                            <Link
                              key={subItem.label}
                              href={subItem.href}
                              className={`flex items-center gap-2 px-3 py-2 rounded-md transition ${
                                subActive
                                  ? "bg-blue-50 text-blue-600 font-semibold border-l-4 border-blue-500"
                                  : "text-gray-600 hover:bg-gray-50"
                              }`}
                            >
                              {subItem.icon && (
                                <subItem.icon className="h-4 w-4 shrink-0" />
                              )}
                              <span>{subItem.label}</span>
                            </Link>
                          );
                        })}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md transition font-medium ${
                    parentActive
                      ? "bg-blue-50 text-blue-600 font-semibold border-l-4 border-blue-500"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {item.icon && <item.icon className="h-5 w-5 shrink-0" />}
                  {item.label}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default Menu;
