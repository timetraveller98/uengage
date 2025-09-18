"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Input } from "@/components/ui/Input";
import { type LoginSchema, loginSchema } from "@/libs/validations";

const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (!result?.ok) {
        const errorMsg =
          result?.error === "User account is disabled."
            ? "Your account is disabled"
            : result?.error === "User account is not verified."
              ? "Please verify your email"
              : "Invalid Credentials";

        toast.error(errorMsg);
        return;
      }

      toast.success("Successfully logged in");
      router.push("/admin");
      router.refresh();
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Failed to log in. Please try again later.");
    }
  };

  return (
    <div className="w-full max-w-md rounded-lg border bg-white p-6 shadow-lg">
      <h1 className="mb-4 text-center text-2xl font-bold text-gray-800">
        Welcome Back
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
        noValidate
      >
        <Input
          label="Email"
          type="email"
          registration={register("email")}
          error={errors.email?.message}
        />
        <Input
          label="Password"
          type="password"
          isPassword
          registration={register("password")}
          error={errors.password?.message}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-green-900 py-2 text-sm font-medium text-white shadow cursor-pointer hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
