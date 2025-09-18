"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import menuItems from "@/components/admin/MenuData";
import DropdownMenu from "./Menu";

interface NavbarProps {
  email: string | null | undefined;
  currentRole?: string;
}

const Navbar: React.FC<NavbarProps> = ({ email, currentRole }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  const allowedMenu = menuItems.filter((item) =>
    currentRole ? item.roles.includes(currentRole) : false,
  );
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <div className="sticky top-0 py-2 z-50 w-full bg-gray-100/95 backdrop-blur-sm shadow-md transition-all duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="logo"
            width={150}
            height={50}
            priority
            className="object-contain p-1"
          />
        </Link>
        <div className="hidden md:flex items-center gap-4">
          <DropdownMenu email={email} />
        </div>
        {isMobile && (
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 hover:bg-gray-200 transition"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        )}
      </div>
      {isMobile && isMobileMenuOpen && (
        <div className="absolute top-16 left-0  mt-2 w-full bg-gray-50 z-50 shadow-md">
          <div className="flex flex-col items-center py-3">
            {allowedMenu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-1 pt-4 text-[16px] cursor-pointer px-4 rounded-md hover:bg-gray-100 transition-colors text-gray-700"
              >
                {item.icon && <item.icon className="w-5 h-5" />}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
          <div className="py-3 flex justify-center bg-gray-50">
            <DropdownMenu
              email={email}
              onAction={() => setMobileMenuOpen(false)}
              currentRole={currentRole}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
