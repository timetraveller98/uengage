import type React from "react";
import { Suspense } from "react";
import { getCurrentUser } from "@/actions/getCurrentUser";
import LoginForm from "@/app/(auth)/login/LoginPage";
import Menu from "@/components/admin/Menu";
import NullData from "@/components/ui/NullData";
import Loading from "../loading";
export const metadata = {
  title: {
    default: "Admin Dashboard",
    template: "%s | uEngage",
  },
  description:
    "Create a scalable admin dashboard using Next.js (App Router) and React.js. Focused on clean architecture, component reusability, SEO readiness, and state management.",
  robots: "noindex, nofollow",
  keywords: [
    "uEngage Admin Dashboard",
    "Next.js Admin Dashboard",
    "React.js Dashboard",
    "Scalable Frontend",
    "Clean Architecture",
    "Component Reusability",
    "SEO Ready Next.js",
    "State Management",
  ],

  openGraph: {
    title: "uEngage - Scalable Admin Dashboard",
    description:
      "Professional uEngage Admin Dashboard built with Next.js App Router, React.js, and modern architecture.",
    url: "https://uengage-phi.vercel.app/admin",
    siteName: "uEngage",
    locale: "en_US",
    type: "website",
  },
};

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <Suspense fallback={<Loading />}>
          <LoginForm />
        </Suspense>
      </div>
    );
  }

  if (currentUser.role !== "SUPERADMIN") {
    return <NullData title="Oops! Access Denied" />;
  }
  return (
    <div className="h-screen flex">
      <div className="hidden md:block w-[18%]">
        <Menu role={currentUser?.role} />
      </div>
      <div className="w-[100%] md:w-[82%] overflow-scroll bg-white-100 flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
