import React from "react";

const Navbar = ({ role, setRole }) => {
  return (
    <div className="w-full flex justify-between items-center px-6 py-4 bg-white/5 backdrop-blur-lg border-b border-white/10">

      <h1 className="text-xl font-bold text-white tracking-wide">
        StaffSync ⚡
      </h1>

      <div className="flex gap-2 bg-white/10 p-1 rounded-xl">

        <button
          onClick={() => setRole("admin")}
          className={`px-4 py-1 rounded-lg text-sm transition-all duration-300
            ${
              role === "admin"
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                : "text-gray-300 hover:bg-white/10"
            }`}
        >
          Admin
        </button>

        <button
          onClick={() => setRole("employee")}
          className={`px-4 py-1 rounded-lg text-sm transition-all duration-300
            ${
              role === "employee"
                ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                : "text-gray-300 hover:bg-white/10"
            }`}
        >
          Employee
        </button>

      </div>
    </div>
  );
};

export default Navbar;