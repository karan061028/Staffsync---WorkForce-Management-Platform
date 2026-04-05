import React from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const NewTask = ({ data, updateTask }) => {
  return (
    <div className="
      p-5 rounded-xl 
      bg-gradient-to-br from-blue-500/10 to-blue-900/10
      border border-blue-500/20
      backdrop-blur-lg
      shadow-md
      hover:scale-[1.02] transition
      relative overflow-hidden
    ">

      {/* LEFT GLOW BORDER */}
      <div className="absolute left-0 top-0 h-full w-1 bg-blue-500"></div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full">
          New
        </span>

        <span className="text-xs text-gray-400">
          {data.date}
        </span>
      </div>

      {/* TITLE */}
      <h3 className="text-lg font-semibold text-white mb-1">
        {data.title}
      </h3>

      {/* DESCRIPTION */}
      <p className="text-sm text-gray-400 mb-4">
        {data.description}
      </p>

      {/* ACTION */}
      <button
        onClick={() => updateTask("active")}
        className="w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition text-sm font-medium"
      >
        Accept Task
      </button>

    </div>
  );
};

export default NewTask;