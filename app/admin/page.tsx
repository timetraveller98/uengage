import AdminHeading from "@/components/ui/AdminHeading";
import api from "@/utils/axios";
import Summary from "./Summary";

export const metadata = {
  title: "Admin Dashboard",
  description:
    "Admin dashboard for managing users, posts, and application settings in uEngage.",
  robots: "noindex, nofollow",
  alternates: {
    canonical: "https://uengage-phi.vercel.app/admin",
  },
};

async function fetchUsers() {
  const res = await api.get("/users");
  return res.data;
}

async function fetchPosts() {
  const res = await api.get("/posts");
  return res.data;
}

const Admin = async () => {
  try {
    const [users, posts] = await Promise.all([fetchUsers(), fetchPosts()]);
    return (
      <main className="p-6">
        <AdminHeading center title="Admin Dashboard" />
        <Summary users={users} posts={posts} />
      </main>
    );
  } catch (error) {
    return (
      <div className="p-6 text-red-500">
        Failed to load data: {String(error)}
      </div>
    );
  }
};

export default Admin;
