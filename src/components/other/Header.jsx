import React from "react";

const Header = ({ changeUser, data }) => {
  return (
    <div className="flex justify-between items-center mb-6">

      <h1 className="text-2xl font-bold text-white">
        Hello, {data?.name || "User"} 👋
      </h1>

      <div className="flex gap-3">

        <button
          onClick={changeUser}
          className="bg-red-500 px-4 py-2 rounded-xl text-white hover:bg-red-600 transition"
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default Header;