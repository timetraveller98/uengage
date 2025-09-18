"use client";
import type { User } from "@prisma/client";
import { type LucideProps, Podcast, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import type { FC, ForwardRefExoticComponent, RefAttributes } from "react";
import type { Post } from "@/types/post";
import FormatNumber from "@/utils/formatNumber";

interface SummaryProps {
  users: User[];
  posts: Post[];
}

type SummaryItem = {
  label: string;
  value: number;
  url: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  color: string;
};

const Summary: FC<SummaryProps> = ({ users, posts }) => {
  const router = useRouter();

  const summaryData: SummaryItem[] = [
    {
      label: "Total Users",
      value: users.length,
      url: "/admin/user",
      icon: Users,
      color: "#06B6D4",
    },
    {
      label: "Total Posts",
      value: posts.length,
      url: "/admin/post",
      icon: Podcast,
      color: "#A78BFA",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      {summaryData.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.label}
            type="button"
            onClick={() => router.push(item.url)}
            className="flex flex-col items-center justify-center bg-white/90 rounded-2xl p-6 shadow-md hover:shadow-lg transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <Icon className="w-8 h-8 mb-2" style={{ color: item.color }} />
            <span className="text-sm font-medium text-gray-600">
              {item.label}
            </span>
            <span className="text-xl font-semibold text-gray-800">
              {FormatNumber(item.value)}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default Summary;
