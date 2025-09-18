import { getServerSession } from "next-auth";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { authOptions } from "@/libs/auth";
import NavbarData from "./Navbar";

const Header = async () => {
  const session = await getServerSession(authOptions);
  const currentUser = await getCurrentUser();
  return (
    <div className="sticky top-0">
      <NavbarData
        email={session?.user.email}
        currentRole={currentUser?.role ?? "USER"}
      />{" "}
    </div>
  );
};
export default Header;
