"use client";
import debounce from "lodash.debounce";
import { useMemo, useState } from "react";
import { FiEye } from "react-icons/fi";
import type { User } from "@/types/user";

interface Props {
  users: User[];
  pageSize?: number;
}

export default function UserTable({ users, pageSize = 5 }: Props) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filteredUsers = useMemo(() => {
    return users.filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [users, search]);

  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredUsers.slice(start, start + pageSize);
  }, [filteredUsers, page, pageSize]);

  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const handleSearch = debounce((value: string) => {
    setSearch(value);
    setPage(1);
  }, 300);

  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-64 p-2 pl-3 pr-10 rounded-full border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none transition duration-200 text-sm"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr className="text-gray-700 uppercase text-sm">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Company</th>
              <th className="p-3 text-center">View</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.phone}</td>
                <td className="p-3">{user.company.name}</td>
                <td className="p-3 text-center">
                  <button
                    type="button"
                    className="text-blue-500 hover:text-blue-700 transition"
                  >
                    <FiEye className="w-5 h-5 inline-block" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          type="button"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition"
        >
          Prev
        </button>
        <span className="text-sm text-gray-700">
          Page {page} of {totalPages}
        </span>
        <button
          type="button"
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
