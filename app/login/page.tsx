import { Suspense } from "react";
import LoginForm from "./LoginPage";
export const metadata = {
  title: "Login",
  description: "Login to access your uEngage Admin Dashboard securely.",
};
const LoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Suspense fallback={<p>Loading login...</p>}>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default LoginPage;
