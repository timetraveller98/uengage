import type { User } from "@prisma/client";
import ProfileCard from "@/components/ui/ProfileCard";
import api from "@/utils/axios";

interface DynamicProps {
  params: { id: string };
}

export async function generateStaticParams() {
  const res = await api.get<User[]>("/users");
  return res.data.map((user) => ({
    id: user.id.toString(),
  }));
}

export async function generateMetadata({ params }: DynamicProps) {
  const { id } = params;

  try {
    const res = await api.get(`/users/${id}`);
    const user = res.data;

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
            url: "/logo.svg",
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
        images: ["/logo.svg"],
      },
      alternates: {
        canonical: `https://uengage-phi.vercel.app/users/${id}`,
      },
      robots: "noindex, nofollow",
    };
  } catch {
    return {
      title: "User Not Found",
      description: "The requested user profile could not be found.",
    };
  }
}

const Dynamic = async ({ params }: DynamicProps) => {
  const { id } = params;

  try {
    const res = await api.get(`/users/${id}`);
    const user = res.data;

    return (
      <div>
        <ProfileCard user={user} />
      </div>
    );
  } catch {
    throw new Error("Failed to fetch user data");
  }
};

export default Dynamic;
