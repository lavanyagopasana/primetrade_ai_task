import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();


  return (
    <nav className="bg-white shadow-md border-b border-gray-100 px-6 sm:px-10 py-4 flex justify-between items-center">
      <h1
        className="text-2xl sm:text-3xl font-bold text-indigo-600 cursor-pointer tracking-tight"
        onClick={() => navigate("/")}
      >
        PrimeTrade.ai
      </h1>

    </nav>
  );
}


