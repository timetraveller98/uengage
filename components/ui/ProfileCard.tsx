"use client";

import { useState } from "react";
import type { User } from "@/types/user";

interface ProfileProps {
  user: User;
}

const ProfileCard = ({ user }: ProfileProps) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col items-center text-center transition hover:shadow-xl">
        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 to-blue-500 flex items-center justify-center text-white text-4xl font-bold shadow-md">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <h1 className="text-2xl font-semibold mt-4">{user.name}</h1>
        <p className="text-gray-500 text-sm">@{user.username}</p>
        <div className="mt-6 space-y-4 text-gray-700 w-full">
          {/* <div className="flex justify-between">
            <p className="font-medium">🆔 ID :</p>
            <p className="text-gray-600">{user.id}</p>
          </div> */}
          <div className="flex justify-between">
            <p className="font-medium">📧 Email :</p>
            <p className="text-gray-600">{user.email}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium">📞 Phone :</p>
            <p className="text-gray-600">{user.phone}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium">🌐 Website :</p>
            <p className="text-gray-600">{user.website}</p>
          </div>
        </div>
        {showDetails && (
          <div className="mt-6 w-full space-y-3 text-gray-600 text-sm border-t pt-4">
            <div>
              <p className="font-medium text-gray-800 my-2">🏠 Address</p>
              <p>
                {user.address.suite}, {user.address.street}, {user.address.city}{" "}
                - {user.address.zipcode}
              </p>
              {user.address.geo && (
                <p className="text-xs mt-1">
                  <span className="font-medium">Geo:</span> Lat{" "}
                  {user.address.geo.lat}, Lng {user.address.geo.lng}
                </p>
              )}
            </div>
            <div>
              <p className="font-medium text-gray-800 my-2">🏢 Company</p>
              <p className="font-semibold">{user.company.name}</p>
              <p>{user.company.catchPhrase}</p>
              <p className="text-xs text-gray-500">{user.company.bs}</p>
            </div>
          </div>
        )}
        <button
          type="button"
          onClick={() => setShowDetails(!showDetails)}
          className="mt-6 px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-500 text-white font-medium shadow hover:scale-105 transition"
        >
          {showDetails ? "Hide Details" : "View More"}
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
