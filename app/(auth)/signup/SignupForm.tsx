"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { setUsers } from "@/actions/getUsers";
import { Input } from "@/components/ui/Input";
import { type SignupSchema, signupSchema } from "@/libs/validations";

const SignupForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupSchema) => {
    startTransition(async () => {
      try {
        const res = await setUsers(data);

        if (res.success) {
          toast.success(res.message);
          router.push("/login");
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        console.error("Signup Error:", error);
        toast.error("Something went wrong. Please try again.");
      }
    });
  };

  return (
    <div className="w-full max-w-md rounded-lg border bg-white p-6 shadow-lg">
      <h1 className="mb-4 text-center text-2xl font-bold text-gray-800">
        Create Account
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
        noValidate
      >
        <Input
          label="Name"
          registration={register("name")}
          error={errors.name?.message}
        />

        <Input
          label="Email"
          type="email"
          registration={register("email")}
          error={errors.email?.message}
        />

        <Input
          label="Password"
          isPassword
          registration={register("password")}
          error={errors.password?.message}
        />

        <button
          type="submit"
          disabled={isPending}
          aria-disabled={isPending}
          aria-busy={isPending}
          className="rounded-md bg-blue-600 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};
export default SignupForm;
