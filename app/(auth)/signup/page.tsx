import { Suspense } from "react";
import Loading from "@/app/loading";
import SignupForm from "./SignupForm";
export const metadata = {
  title: "Sign Up",
  description:
    "Create your account to access the uEngage Admin Dashboard securely.",
  alternates: {
    canonical: "https://uengage-phi.vercel.app/signup",
  },
};

const SignupPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Suspense fallback={<Loading />}>
        <SignupForm />
      </Suspense>
    </div>
  );
};
export default SignupPage;
