"use client";
interface ErrorPageProps {
  message?: string;
}
const ErrorPage = ({ message = "Something went wrong!" }: ErrorPageProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-md w-full text-center bg-white shadow-lg rounded-lg p-8">
        <div className="flex justify-center mb-4">
          <svg
            className="w-16 h-16 text-red-500 animate-pulse"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
          >
            <title>Error icon</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Oops!</h1>
        <p className="text-gray-600 mb-6">{message}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};
export default ErrorPage;
