export const metadata = {
  title: "uEngage | Admin Dashboard",
  description:
    "A scalable admin dashboard built with Next.js, TailwindCSS, and modern tools. Manage users and posts seamlessly.",
  keywords: [
    "uEngage",
    "Admin Dashboard",
    "Next.js 15",
    "TailwindCSS",
    "React",
    "User Management",
    "Posts Management",
  ],
  alternates: {
    canonical: "https://uengage-phi.vercel.app",
  },
};

import Link from "next/link";

const Home = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <section className="text-center max-w-3xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 leading-tight">
          Welcome to <span className="text-green-900">uEngage</span> Admin
          Dashboard
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 px-2 sm:px-4">
          Users List, explore posts, and experience a clean, modern dashboard
          built with <span className="font-semibold">Next.js</span>,{" "}
          <span className="font-semibold">MongoDB</span>,{" "}
          <span className="font-semibold">TailwindCSS</span>, and{" "}
          <span className="font-semibold">NextAuth</span>.
        </p>

        <Link
          href="/login"
          className="inline-block px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-green-800 text-white font-semibold shadow-md hover:bg-green-900 transition"
        >
          Get Started
        </Link>
      </section>
    </main>
  );
};

export default Home;
