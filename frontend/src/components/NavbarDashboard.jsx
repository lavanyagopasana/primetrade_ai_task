import React from "react";
import { LogOut, User } from "lucide-react";

export default function NavbarDashboard({ onLogout }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="w-full flex justify-between items-center px-8 py-4">
        {/* Left: App Name */}
        <h1 className="text-xl sm:text-2xl font-semibold tracking-wide text-gray-800 flex items-center gap-2">
          <User className="w-6 h-6 text-indigo-600" />
          Dashboard
        </h1>

        {/* Right: Logout button */}
        <button
          onClick={onLogout}
          className="flex items-center gap-2 bg-red-600 hover:bg-indigo-700 transition-colors duration-300 px-5 py-2.5 rounded-lg text-sm font-medium text-white shadow-sm"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </nav>
  );
}
