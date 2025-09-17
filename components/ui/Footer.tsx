"use client";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 py-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-8">
        <div>
          <h2 className="text-white font-semibold mb-4  text-[20px]">
            Information
          </h2>
          <ul className="space-y-2 font-medium">
            <li>
              <Link href="#" className="hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Our Story
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Press
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Careers
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Blog
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-white font-semibold mb-4 text-[20px]">Talrn</h2>
          <ul className="space-y-2 font-medium">
            <li>
              <Link href="#" className="hover:text-white">
                View iOS Profiles
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Discover
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-white font-semibold mb-4 text-[20px]">Vendor</h2>
          <ul className="space-y-2 font-medium">
            <li>
              <Link href="#" className="hover:text-white">
                Apply As Vendor
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Vendor Login
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Get Verified
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Remote Jobs
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Resources
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-white font-semibold mb-4 text-[20px]">Social</h2>
          <div className="flex space-x-5">
            <Link href="#" className="hover:text-white">
              <FaLinkedin size={20} />
            </Link>
            <Link href="#" className="hover:text-white">
              <FaTwitter size={20} />
            </Link>
            <Link href="#" className="hover:text-white">
              <FaFacebook size={20} />
            </Link>
            <Link href="#" className="hover:text-white">
              <FaInstagram size={20} />
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto my-10  border-t-3 border-white-800 pt-8 flex flex-col md:flex-row justify-between items-center text-18px] text-gray-400">
        <p className="text-center md:text-left font-large">
          © 2022 - 2025{" "}
          <span className="font-semibold text-white">uEngage</span> - Labor
          Omnia Vincit ⚡ by{" "}
          <Link href="#" className="text-blue-500 hover:underline">
            CG Advantage
          </Link>
        </p>
        <div className="flex space-x-6 mt-4 md:mt-0 font-semibold text-16px]">
          <Link href="#" className="hover:text-white">
            Terms of Use
          </Link>
          <Link href="#" className="hover:text-white">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
