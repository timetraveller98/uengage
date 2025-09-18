"use client";
import { useQuery } from "@tanstack/react-query";
import ErrorPage from "@/app/error";
import Loading from "@/app/loading";
import PostTable from "@/components/ui/PostTable";
import type { Post } from "@/types/post";
import type { User } from "@/types/user";
import api from "@/utils/axios";

interface PostWithUser extends Post {
  user: User;
}

const PostPage = () => {
  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery<PostWithUser[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      const [postsRes, usersRes] = await Promise.all([
        api.get("/posts"),
        api.get("/users"),
      ]);
      const users: User[] = usersRes.data;
      const postsWithUser = postsRes.data.map((post: Post) => {
        const user = users.find((u) => u.id === post.userId);
        return { ...post, user };
      });
      return postsWithUser;
    },
    staleTime: 1000 * 60 * 10,
  });

  if (isLoading) return <Loading />;
  if (isError || !posts) return <ErrorPage message="Posts Not Found" />;

  return (
    <div className="p-6">
      <PostTable posts={posts} />
    </div>
  );
};

export default PostPage;
