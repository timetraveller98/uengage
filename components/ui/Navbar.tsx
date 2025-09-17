"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import DropdownMenu from "./Menu";

interface NavbarProps {
  email: string | null | undefined;
  currentRole?: string;
}
const Navbar: React.FC<NavbarProps> = ({ email }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
  return (
    <header className="sticky top-0 z-50 py-2 w-full border-b bg-white/90 backdrop-blur-md shadow-sm transition-all duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="logo"
            width={50}
            height={50}
            priority
            className="object-contain rounded-full"
          />
        </Link>
        <div className="hidden md:flex items-center gap-4">
          <DropdownMenu email={email} />
        </div>
        <div className="md:hidden flex items-center">
          <button
            type="button"
            onClick={toggleMobileMenu}
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-gray-100 transition"
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
      </div>
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray shadow-lg z-50 transform transition-transform duration-300 ease-in-out md:hidden
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col mt-16 space-y-4 px-4">
          <div className="flex flex-col items-center space-y-4">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 px-4 rounded-md hover:bg-gray-100 transition"
            >
              Home
            </Link>
            <DropdownMenu email={email} />
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 px-4 rounded-md hover:bg-gray-100 transition"
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 px-4 rounded-md hover:bg-gray-100 transition"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
