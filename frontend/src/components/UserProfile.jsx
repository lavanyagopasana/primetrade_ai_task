import React from "react";
import { User, Mail } from "lucide-react";

export default function UserProfile({ user }) {
  return (
    <div
      className="relative bg-white border border-gray-200 rounded-2xl shadow-lg 
                 p-4 sm:p-6 max-w-3xl mx-auto w-full transition-transform 
                 hover:scale-[1.01] hover:shadow-xl duration-300 ease-in-out"
    >
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-start items-center text-center sm:text-left gap-4 mb-4">
        <div
          className="w-16 h-16 sm:w-14 sm:h-14 bg-gradient-to-br from-indigo-500 to-blue-400 
                     rounded-full flex items-center justify-center shadow-md"
        >
          <User className="text-white w-8 h-8 sm:w-7 sm:h-7" />
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            {user.username || "User"}
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            Welcome to your dashboard 👋
          </p>
        </div>
      </div>

      {/* Email Info */}
      <div
        className="flex flex-col sm:flex-row items-center sm:items-start sm:gap-3 gap-1 
                   text-gray-700 sm:pl-4 text-center sm:text-left"
      >
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <Mail className="w-5 h-5 text-indigo-500" />
          <span className="font-medium break-words text-sm sm:text-base">
            {user.email || "user@example.com"}
          </span>
        </div>
      </div>
    </div>
  );
}
