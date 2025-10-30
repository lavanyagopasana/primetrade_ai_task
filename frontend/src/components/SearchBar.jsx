import React from "react";
import { Search } from "lucide-react"; // lightweight icon

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* 🔍 Search Icon */}
      <Search className="absolute left-4 top-3.5 text-gray-500 w-5 h-5" />

      {/* 🔎 Input */}
      <input
        type="text"
        placeholder="Search entities..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 
                   rounded-xl shadow-sm text-gray-800 placeholder-gray-500
                   focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 
                   outline-none transition-all duration-200"
      />
    </div>
  );
}
