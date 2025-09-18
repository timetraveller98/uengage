"use client";

import { Button } from "@mui/material";
import { LogIn, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useCallback, useMemo, useState } from "react";
import { MdClose, MdExpandLess, MdExpandMore, MdMenu } from "react-icons/md";
import menuItems from "./MenuData";

interface SidebarProps {
  currentUserId: string;
  role: string;
}

const Sidebar: React.FC<SidebarProps> = ({ role, currentUserId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const router = useRouter();

  const toggleDropdown = useCallback(
    (label: string) =>
      setOpenDropdown((prev) => (prev === label ? null : label)),
    [],
  );

  const handleCloseSidebar = useCallback(() => setIsOpen(false), []);

  const handleLogout = useCallback(() => {
    localStorage.clear();
    const callbackUrl = `${window.location.origin}/login`;
    signOut({ redirect: false, callbackUrl }).then(() => {
      router.refresh();
      setIsOpen(false);
    });
  }, [router]);

  const filteredMenuItems = useMemo(
    () => menuItems.filter((item) => item.roles.includes(role)),
    [role],
  );

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between bg-white shadow-md px-4 py-2">
        <Link
          href={currentUserId ? "/admin" : "/"}
          className="flex items-center"
        >
          <Image src="/logo.png" alt="logo" height={50} width={120} priority />
        </Link>
        <button
          type="button"
          aria-label="Toggle sidebar"
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <MdClose size={28} /> : <MdMenu size={28} />}
        </button>
      </header>

      {/* Overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          className="fixed inset-0 bg-black/40 z-40"
          onClick={handleCloseSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex justify-center py-6 border-b">
          <Image src="/logo.png" alt="logo" height={60} width={60} priority />
        </div>

        {/* Navigation */}
        <nav className="p-4 flex flex-col gap-1 overflow-y-auto">
          {filteredMenuItems.map((item) => (
            <div key={item.label} className="flex flex-col">
              {item.subItems ? (
                <>
                  <button
                    type="button"
                    onClick={() => toggleDropdown(item.label)}
                    className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-100 transition text-gray-700 font-medium"
                  >
                    <span className="flex items-center gap-2">
                      {item.icon && <item.icon className="h-5 w-5" />}
                      {item.label}
                    </span>
                    {openDropdown === item.label ? (
                      <MdExpandLess />
                    ) : (
                      <MdExpandMore />
                    )}
                  </button>

                  {/* Submenu */}
                  {openDropdown === item.label && (
                    <div className="ml-6 mt-1 flex flex-col gap-1">
                      {item.subItems
                        .filter((sub) => sub.roles.includes(role))
                        .map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href || "#"}
                            onClick={handleCloseSidebar}
                            className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100 transition"
                          >
                            {subItem.icon && (
                              <subItem.icon className="h-4 w-4" />
                            )}
                            {subItem.label}
                          </Link>
                        ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={handleCloseSidebar}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition font-medium"
                >
                  {item.icon && <item.icon className="h-5 w-5" />}
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Footer Action */}
        <div className="p-4 border-t flex justify-center">
          {role ? (
            <Button
              type="button"
              onClick={handleLogout}
              color="inherit"
              size="small"
              className="flex items-center gap-2 border border-gray-300 px-3 py-1 rounded-md text-gray-700 hover:bg-gray-100 transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          ) : (
            <Button
              type="button"
              onClick={() => router.push("/login")}
              color="inherit"
              size="small"
              className="flex items-center gap-2 border border-gray-300 px-3 py-1 rounded-md text-gray-700 hover:bg-gray-100 transition"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Button>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
