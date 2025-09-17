"use client";

import { type LucideProps, Users } from "lucide-react";
import Link from "next/link";
import {
  type FC,
  type ForwardRefExoticComponent,
  type RefAttributes,
  useEffect,
  useState,
} from "react";
import FormatNumber from "@/utils/formatNumber";

interface SummaryProps {
  users: number;
}

type SummaryItem = {
  label: string;
  digit: number;
  bgColor: string;
  url: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

type SummaryDataType = Record<string, SummaryItem>;

const Summary: FC<SummaryProps> = ({ users }) => {
  const [summaryData, setSummaryData] = useState<SummaryDataType>({
    users: {
      label: "Total Users",
      digit: 0,
      bgColor: "bg-blue-100",
      url: "/admin/user",
      icon: Users,
    },
  });

  useEffect(() => {
    setSummaryData((prev) => ({
      ...prev,
      users: {
        ...prev.users,
        digit: users,
      },
    }));
  }, [users]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {Object.entries(summaryData).map(
        ([key, { label, digit, bgColor, url, icon: Icon }]) => (
          <Link
            key={key}
            href={url}
            passHref
            className={`flex flex-col items-center justify-center p-8 rounded-xl shadow hover:shadow-xl transition-shadow duration-300 ${bgColor}`}
          >
            <Icon size={50} className="text-gray-700 mb-4" />
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">
                {FormatNumber(digit)}
              </div>
              <div className="text-gray-600 text-lg">{label}</div>
            </div>
          </Link>
        ),
      )}
    </div>
  );
};

export default Summary;
