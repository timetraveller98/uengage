import type { User } from "@prisma/client";
import ProfileCard from "@/components/ui/ProfileCard";

interface DynamicProps {
  params: { id: string };
}

export async function generateStaticParams() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();
  return users.map((user: User) => ({
    id: user.id.toString(),
  }));
}

export async function generateMetadata({ params }: DynamicProps) {
  const { id } = await params;
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return {
      title: "User Not Found",
      description: "The requested user profile could not be found.",
    };
  }
  const user = await res.json();
  return {
    title: `${user.name} | Profile`,
    description: `Details about ${user.name}, contact info: ${user.email}, works at ${user.company?.name}.`,
    keywords: [user.name, user.username, "profile", "Next.js SEO"],
    openGraph: {
      title: `${user.name} | Profile`,
      description: `Explore details about ${user.name}, including contact information and company.`,
      url: `https://uengage-phi.vercel.app/users/${id}`,
      siteName: "uEngage",
      images: [
        {
          url: "/logo.png",
          width: 1200,
          height: 630,
          alt: `${user.name} profile preview`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${user.name} | Profile`,
      description: `Check out ${user.name}'s profile on My App.`,
      images: ["/logo.png"],
    },
    alternates: {
      canonical: `https://uengage-phi.vercel.app/users/${id}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

const Dynamic = async ({ params }: DynamicProps) => {
  const { id } = await params;
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch user data");
  }
  const user = await res.json();
  return (
    <div>
      <ProfileCard user={user} />
    </div>
  );
};

export default Dynamic;
