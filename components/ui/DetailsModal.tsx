"use client";
import { AnimatePresence, motion } from "framer-motion";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { FiEye, FiX } from "react-icons/fi";
import type { Post } from "@/types/post";
import type { User } from "@/types/user";

export interface PostWithUser extends Post {
  user: User;
}
interface DetailsModalProps {
  post: PostWithUser;
}
const DetailsModal: React.FC<DetailsModalProps> = ({ post }) => {
  const [open, setOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="View details"
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
      >
        <FiEye className="w-5 h-5" />
        <span className="text-sm font-medium">View</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              ref={modalRef}
              key="modal"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-xl md:max-w-2xl p-8 relative overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close modal"
                className="absolute top-5 cursor-pointer right-5 text-gray-500 hover:text-gray-900 transition"
              >
                <FiX className="w-6 h-6" />
              </button>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 border-b pb-3">
                Post Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <section className="bg-gray-50 p-4 rounded-xl shadow-inner hover:shadow-md transition">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3  gap-2">
                    👤 User Info
                  </h3>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Name:</span>{" "}
                    {post.user.name}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    <span className="font-semibold">Email:</span>{" "}
                    {post.user.email}
                  </p>
                </section>
                <section className="bg-gray-50 p-4 rounded-xl shadow-inner hover:shadow-md transition">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3 gap-2">
                    📝 Post Info
                  </h3>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Title:</span> {post.title}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    <span className="font-semibold">Body:</span> {post.body}
                  </p>
                </section>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DetailsModal;
