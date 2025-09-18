import { Suspense } from "react";
import Loading from "@/app/loading";
import LoginForm from "./LoginPage";
export const metadata = {
  title: "Login",
  description: "Login to access your uEngage Admin Dashboard securely.",
  alternates: {
    canonical: "https://uengage-phi.vercel.app/login",
  },
};
const LoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Suspense fallback={<Loading />}>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default LoginPage;
