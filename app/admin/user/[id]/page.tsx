import { getRoles } from "@/actions/authentication/getRole";
import getUsers from "@/actions/authentication/getUsers";
import ManageUser from "./Manage";

interface StaticParam {
  id: string;
}

const Dynamic = async () => {
  const { roles } = await getRoles();
  return (
    <div>
      <ManageUser roles={roles} />
    </div>
  );
};
export default Dynamic;

export async function generateStaticParams(): Promise<StaticParam[]> {
  const users = await getUsers();
  return users.map((user) => ({
    id: user.id.toString(),
  }));
}
