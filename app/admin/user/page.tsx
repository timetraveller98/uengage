"use client";
import { useQuery } from "@tanstack/react-query";
import ErrorPage from "@/app/error";
import Loading from "@/app/loading";
import UserTable from "@/components/ui/UserTable";
import type { User } from "@/types/user";
import api from "@/utils/axios";

const UsersPage = () => {
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await api.get("/users");
      return res.data;
    },
    staleTime: 1000 * 60 * 10,
  });

  if (isLoading) return <Loading />;
  if (isError || !users) return <ErrorPage message="User Not Found" />;
  return (
    <div className="p-6">
      <UserTable users={users} />
    </div>
  );
};
export default UsersPage;
