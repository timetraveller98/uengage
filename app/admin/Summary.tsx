"use client";

import type { User } from "@prisma/client";
import { type LucideProps, Podcast, Users } from "lucide-react";
import Link from "next/link";
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
  const summaryData: SummaryItem[] = [
    {
      label: "Total Users",
      value: users.length,
      url: "/admin/user",
      icon: Users,
      color: "blue",
    },
    {
      label: "Total Posts",
      value: posts.length,
      url: "/admin/post",
      icon: Podcast,
      color: "purple",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
      {summaryData.map(({ label, value, url, icon: Icon, color }) => (
        <Link
          key={label}
          href={url}
          className={`
            group relative overflow-hidden rounded-2xl border border-blue-500
            bg-white/80 backdrop-blur-md shadow-md 
            hover:shadow-2xl transition-all duration-300 
            hover:-translate-y-1 w-full
          `}
        >
          <div className="p-10 flex flex-col  items-center text-center space-y-6">
            <div>
              <Icon size={33} className="text-blue-500" />
            </div>
            <div>
              <div className=" font-extrabold text-blue-500 tracking-tight">
                {FormatNumber(value)}
              </div>
              <div className="text-blue-600  font-medium">{label}</div>
            </div>
          </div>
          <div
            className={`absolute inset-0 bg-gradient-to-br from-${color}-100/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}
          />
        </Link>
      ))}
    </div>
  );
};

export default Summary;
