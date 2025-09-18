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
const Admin = async () => {
  return (
    <div className="flex gap-4 justify-between flex-wrap">
      <Summary users={12} />
    </div>
  );
};

export default Admin;
