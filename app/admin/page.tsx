import AdminHeading from "@/components/ui/AdminHeading";
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
async function getData() {
  const [userRes, postRes] = await Promise.all([
    fetch("https://jsonplaceholder.typicode.com/users", {
      cache: "no-store",
    }),
    fetch("https://jsonplaceholder.typicode.com/posts", {
      cache: "no-store",
    }),
  ]);

  if (!userRes.ok || !postRes.ok) {
    throw new Error("Failed to fetch data");
  }

  const users = await userRes.json();
  const posts = await postRes.json();

  return { users, posts };
}

const Admin = async () => {
  const { users, posts } = await getData();

  return (
    <main className="p-6">
      <AdminHeading center title={"Admin Dashboard"} />
      <Summary users={users} posts={posts} />
    </main>
  );
};

export default Admin;
