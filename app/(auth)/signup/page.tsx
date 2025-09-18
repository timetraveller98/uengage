import { Suspense } from "react";
import SignupForm from "./SignupForm";
export const metadata = {
  title: "Sign Up",
  description:
    "Create your account to access the uEngage Admin Dashboard securely.",
};

const SignupPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Suspense fallback={<p>Loading signup...</p>}>
        <SignupForm />
      </Suspense>
    </div>
  );
};
export default SignupPage;
