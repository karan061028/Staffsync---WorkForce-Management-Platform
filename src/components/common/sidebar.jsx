import React from "react";

const Sidebar = ({ role, setRole }) => {
  return (
    <div className="w-64 h-screen bg-[#020617] border-r border-white/10 p-5 flex flex-col">

  {/* TOP */}
  <div>
    <h1 className="text-xl font-bold text-white mb-8">
      StaffSync ⚡
    </h1>

    <div className="flex flex-col gap-3">

      <button
        onClick={() => setRole("admin")}
        className={`text-left px-4 py-2 rounded-lg transition
        ${
          role === "admin"
            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
            : "text-gray-400 hover:bg-white/10"
        }`}
      >
        🛠 Admin Dashboard
      </button>

      <button
        onClick={() => setRole("employee")}
        className={`text-left px-4 py-2 rounded-lg transition
        ${
          role === "employee"
            ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
            : "text-gray-400 hover:bg-white/10"
        }`}
      >
        👨‍💻 Employee Dashboard
      </button>

    </div>
  </div>

  {/* BOTTOM */}
  <div className="mt-auto text-xs text-gray-500">
    v1.0 • SaaS UI
  </div>

</div>
 
  );
};

export default Sidebar;