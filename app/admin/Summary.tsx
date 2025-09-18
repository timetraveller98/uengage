"use client";
import type { User } from "@prisma/client";
import { type LucideProps, Podcast, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import type { FC, ForwardRefExoticComponent, RefAttributes } from "react";
import {
  Cell,
  Pie,
  PieChart,
  type PieLabelRenderProps,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
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

interface CustomPieLabelProps extends PieLabelRenderProps {
  percent?: number;
}

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
      <div className="col-span-1 md:col-span-2 bg-white/90 p-6 rounded-2xl shadow-md">
        <div className="h-60 sm:h-72 md:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={summaryData}
                dataKey="value"
                nameKey="label"
                cx="50%"
                cy="50%"
                outerRadius="70%"
                label={({ name, percent }: CustomPieLabelProps) =>
                  `${name} ${(percent ? percent * 100 : 0).toFixed(0)}%`
                }
                onClick={(data: SummaryItem) => {
                  if (data?.url) router.push(data.url);
                }}
                cursor="pointer"
              >
                {summaryData.map((entry) => (
                  <Cell
                    key={`cell-${entry.label}`}
                    fill={entry.color}
                    style={{
                      outline: "none",
                      stroke: entry.color,
                      strokeWidth: 1,
                    }}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => FormatNumber(value)}
                contentStyle={{ borderRadius: "12px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6">
          {summaryData.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => router.push(item.url)}
                className="flex flex-col items-center justify-center bg-gray-50 rounded-xl p-4 shadow-sm hover:shadow-md transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <Icon className="w-6 h-6 mb-2" style={{ color: item.color }} />
                <span className="text-sm font-medium text-gray-600">
                  {item.label}
                </span>
                <span className="text-lg font-semibold text-gray-800">
                  {FormatNumber(item.value)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Summary;
