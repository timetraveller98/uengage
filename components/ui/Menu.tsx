import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";

interface NavbarProps {
  email: string | null | undefined;
}

const DropdownMenu: React.FC<NavbarProps> = ({ email }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => setIsOpen(!isOpen);
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
        className="flex items-center px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      >
        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold mr-3">
          {avatarText}
        </div>
        <span className="text-sm font-medium text-gray-800">
          {email ? "Welcome" : "Login"}
        </span>
        <svg
          className={`w-4 h-4 ml-2 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
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
        <div className="absolute right-0 mt-2 w-45 bg-white border border-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50 animate-fade-in">
          {email ? (
            <div className="py-1">
              <Link
                href="/admin"
                onClick={closeDropdown}
                className="block px-4 py-2 text-center text-sm text-gray-700 hover:bg-gray-100 transition"
              >
                Dashboard
              </Link>
              <hr className="my-1" />
              <button
                type="button"
                onClick={handleLogout}
                className="w-full text-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-gray-100 hover:text-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="py-1">
              <Link
                href="/login"
                onClick={closeDropdown}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
              >
                Login
              </Link>
              <hr className="my-1" />
              <Link
                href="/signup"
                onClick={closeDropdown}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
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

export default DropdownMenu;
