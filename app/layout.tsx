import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: {
    default: "uEngage",
    template: "%s | uEngage",
  },
  description:
    "Create a scalable admin dashboard using Next.js (App Router) and React.js. Focused on clean architecture, component reusability, SEO readiness, and state management.",
  robots: "index, follow",

  openGraph: {
    title: "uEngage - Scalable Application",
    description:
      "Professional uEngage built with Next.js App Router, React.js, and modern architecture.",
    url: "https://uengage-phi.vercel.app",
    siteName: "uEngage",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Toaster
          toastOptions={{
            style: {
              background: "rgb(51 65 85)",
              color: "#fff",
            },
          }}
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
