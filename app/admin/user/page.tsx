// import ShowAdmin from "./ShowAdmin";

import { Suspense } from "react";
import { getCurrentUser } from "@/actions/getCurrentUser";
import LoginForm from "@/app/login/LoginPage";
import NullData from "@/components/ui/NullData";

//  https://jsonplaceholder.typicode.com/users

const AdminUser = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <Suspense fallback={<p>Loading login...</p>}>
          <LoginForm />
        </Suspense>
      </div>
    );
  }

  if (currentUser.role !== "SUPERADMIN") {
    return <NullData title="Oops! Access Denied" />;
  }
  return (
    <div>
      <h1>User</h1>
      {/* <ShowAdmin /> */}
    </div>
  );
};

export default AdminUser;
