"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}
const ErrorPage = ({ error, reset }: ErrorProps) => {
  const router = useRouter();
  useEffect(() => {
    console.error("Error occurred:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-6">
      <h1 className="text-3xl font-bold text-red-600">
        Oops! Something went wrong.
      </h1>
      <p className="mt-2 text-gray-700">
        We encountered an unexpected error. Please try again.
      </p>
      <div className="mt-6 flex space-x-4">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          Retry
        </button>
        <button
          type="button"
          onClick={() => router.push("/")}
          className="rounded-lg bg-gray-600 px-4 py-2 text-white transition hover:bg-gray-700"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
