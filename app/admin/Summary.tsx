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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
      <div className="col-span-1 md:col-span-2 bg-white/90 p-6 rounded-2xl shadow-md">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={summaryData}
                dataKey="value"
                nameKey="label"
                cx="50%"
                cy="50%"
                outerRadius={100}
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
      </div>
    </div>
  );
};

export default Summary;
