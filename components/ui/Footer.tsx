"use client";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-white py-6 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm text-center md:text-left">
          © 2025
          <span className="font-semibold text-white ms-1">uEngage</span>. All
          rights reserved.
        </p>
        <div className="flex space-x-6 text-sm mt-4 md:mt-0">
          <Link href="#" className="hover:text-white transition">
            Terms
          </Link>
          <Link href="#" className="hover:text-white transition">
            Privacy
          </Link>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link href="#" className="hover:text-white transition">
            <FaLinkedin size={18} />
          </Link>
          <Link href="#" className="hover:text-white transition">
            <FaTwitter size={18} />
          </Link>
          <Link href="#" className="hover:text-white transition">
            <FaFacebook size={18} />
          </Link>
          <Link href="#" className="hover:text-white transition">
            <FaInstagram size={18} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
