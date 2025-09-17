"use client";

import debounce from "lodash.debounce";
import { useMemo, useState } from "react";
import { FiEye } from "react-icons/fi";
import type { Post } from "@/types/post";
import type { User } from "@/types/user";
import { truncateWords } from "@/utils/truncate";
import Pagination from "./Pagination";

export interface PostWithUser extends Post {
  user: User;
}

interface PostTableProps {
  posts: PostWithUser[];
  pageSize?: number;
}

const PostTable = ({ posts, pageSize = 5 }: PostTableProps) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filteredPosts = useMemo(() => {
    return posts.filter(
      (post) =>
        post.user.name.toLowerCase().includes(search.toLowerCase()) ||
        post.user.email.toLowerCase().includes(search.toLowerCase()),
    );
  }, [posts, search]);

  const paginatedPosts = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredPosts.slice(start, start + pageSize);
  }, [filteredPosts, page, pageSize]);

  const totalPages = Math.ceil(filteredPosts.length / pageSize);

  const handleSearch = debounce((value: string) => {
    setSearch(value);
    setPage(1);
  }, 300);

  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="w-64 p-2 pl-3 pr-10 rounded-full border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none transition duration-200 text-sm"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr className="text-gray-700 uppercase text-sm">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Content</th>
              <th className="p-3 text-center">View</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedPosts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50 transition">
                <td className="p-3">{post.user.name}</td>
                <td className="p-3">{truncateWords(post.title)}</td>
                <td className="p-3">{truncateWords(post.body)}</td>

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
      <div className="flex justify-center items-center mt-4 space-x-2">
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default PostTable;
