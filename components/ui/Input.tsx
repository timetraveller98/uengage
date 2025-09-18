"use client";
import { Eye, EyeOff } from "lucide-react";
import type { InputHTMLAttributes } from "react";
import { useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  registration: UseFormRegisterReturn;
  isPassword?: boolean;
}
export const Input: React.FC<InputProps> = ({
  label,
  error,
  registration,
  isPassword = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex flex-col gap-1 relative">
      <label className="text-sm font-medium text-gray-700">
        {label}
        <input
          {...registration}
          {...props}
          type={isPassword ? (showPassword ? "text" : "password") : props.type}
          className={`rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none  w-full ${
            error
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-300 focus:ring-blue-500"
          }`}
        />
      </label>
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-[28px] text-gray-400"
        >
          {showPassword ? <EyeOff size={21} /> : <Eye size={21} />}
        </button>
      )}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};
