"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import menuItems from "@/components/admin/MenuData";

interface NavbarProps {
  email: string | null | undefined;
  currentRole?: string;
}

const Navbar: React.FC<NavbarProps> = ({ email, currentRole }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

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
    <header className="sticky top-0 z-50 w-full py-2 bg-gray-100/95 backdrop-blur-md shadow-sm transition-all duration-300">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
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
          <DropdownMenu email={email} currentRole={currentRole} />
        </div>
        {isMobile && (
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={toggleMobileMenu}
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 hover:bg-gray-200 transition md:hidden"
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
        )}
      </nav>
      {isMobile && isMobileMenuOpen && (
        <div className="absolute top-22 left-0 w-full bg-white shadow-md z-40">
          <div className="flex flex-col items-center justify-center py-3">
            {allowedMenu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center  justify-center  gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
              >
                {item.icon && <item.icon className="w-5 h-5" />}
                {item.label}
              </Link>
            ))}
          </div>
          <div className=" py-3 flex justify-center">
            <DropdownMenu
              email={email}
              currentRole={currentRole}
              onAction={() => setMobileMenuOpen(false)}
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

interface DropdownMenuProps {
  email: string | null | undefined;
  currentRole?: string;
  onAction?: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  email,
  onAction,
  currentRole,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const closeDropdown = () => setIsOpen(false);

  const handleLogout = async () => {
    localStorage.clear();
    await signOut({
      redirect: false,
      callbackUrl: `${window.location.origin}/login`,
    });
    router.refresh();
    setIsOpen(false);
  };

  const avatarText = email ? email.charAt(0).toUpperCase() : "L";

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={toggleDropdown}
        className="flex items-center px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-green-200 transition"
      >
        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold mr-2">
          {avatarText}
        </div>
        <span className="text-sm font-medium text-gray-800">
          {email ? "Welcome" : "Login"}
        </span>
        <svg
          className={`w-4 h-4 ml-2 text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white  rounded-md shadow-lg z-50">
          {email ? (
            <div className="py-1">
              {currentRole === "SUPERADMIN" && (
                <Link
                  href="/admin"
                  onClick={() => {
                    closeDropdown();
                    onAction?.();
                  }}
                  className="block px-4 py-2 text-center text-sm text-green-900 hover:bg-gray-100"
                >
                  Dashboard
                </Link>
              )}
              <button
                type="button"
                onClick={() => {
                  handleLogout();
                  onAction?.();
                }}
                className="w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-gray-100 text-center"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="py-1">
              <Link
                href="/login"
                onClick={() => {
                  closeDropdown();
                  onAction?.();
                }}
                className="block px-4 py-2 text-sm text-blue-900 text-center hover:bg-gray-100"
              >
                Login
              </Link>
              <Link
                href="/signup"
                onClick={() => {
                  closeDropdown();
                  onAction?.();
                }}
                className="block px-4 py-2 text-sm text-blue-900 text-center hover:bg-gray-100"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
