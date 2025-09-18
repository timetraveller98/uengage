"use client";
import debounce from "lodash.debounce";
import { useEffect, useMemo, useState } from "react";
import type { Post } from "@/types/post";
import type { User } from "@/types/user";
import { truncateLetters } from "@/utils/truncate";
import DetailsModal from "./DetailsModal";
import Pagination from "./Pagination";

export interface PostWithUser extends Post {
  user: User;
}

interface PostTableProps {
  posts: PostWithUser[];
  pageSize?: number;
}

const ALL_USERS = "all";

const PostTable = ({ posts, pageSize = 5 }: PostTableProps) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<string>(ALL_USERS);

  const uniqueUsers = useMemo(() => {
    const seen = new Map<number, User>();
    posts.forEach((post) => {
      if (!seen.has(post.user.id)) {
        seen.set(post.user.id, post.user);
      }
    });
    return Array.from(seen.values());
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const lowerSearch = search.toLowerCase();
    return posts.filter((post) => {
      const matchesSearch =
        post.user.name.toLowerCase().includes(lowerSearch) ||
        post.user.email.toLowerCase().includes(lowerSearch);

      const matchesUser =
        selectedUser === ALL_USERS || post.user.id.toString() === selectedUser;

      return matchesSearch && matchesUser;
    });
  }, [posts, search, selectedUser]);

  const paginatedPosts = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredPosts.slice(start, start + pageSize);
  }, [filteredPosts, page, pageSize]);

  const totalPages = Math.ceil(filteredPosts.length / pageSize);

  const handleSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearch(value);
        setPage(1);
      }, 300),
    [],
  );
  useEffect(() => {
    return () => {
      handleSearch.cancel();
    };
  }, [handleSearch]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4 gap-4">
        <select
          value={selectedUser}
          onChange={(e) => {
            setSelectedUser(e.target.value);
            setPage(1);
          }}
          className="p-2 rounded-full border border-gray-300 shadow-sm text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          <option value={ALL_USERS}>All Users</option>
          {uniqueUsers.map((user) => (
            <option key={user.id} value={user.id.toString()}>
              {user.name}
            </option>
          ))}
        </select>
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
                <td className="p-3">{truncateLetters(post.user.name, 30)}</td>
                <td className="p-3">{truncateLetters(post.title, 30)}</td>
                <td className="p-3">{truncateLetters(post.body, 40)}</td>
                <td className="p-3 text-center">
                  <DetailsModal post={post} />
                </td>
              </tr>
            ))}
            {paginatedPosts.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="text-center text-gray-500 p-4 italic"
                >
                  No posts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {filteredPosts.length > 0 && (
        <div className="flex justify-center items-center mt-4 space-x-2">
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default PostTable;
