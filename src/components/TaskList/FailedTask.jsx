import React from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const FailedTask = ({ data }) => {

  const handleClick = () => {
    toast.error("Task marked as failed ❌");
  };

  return (
    <div className="p-5 rounded-xl bg-red-500/10 border border-red-500/20 backdrop-blur-lg relative">

      <div className="absolute left-0 top-0 h-full w-1 bg-red-500"></div>

      <div className="flex justify-between mb-2">
        <span className="text-xs px-3 py-1 bg-red-500/20 text-red-400 rounded-full">
          Failed
        </span>
        <span className="text-xs text-gray-400">{data.date}</span>
      </div>

      <h3 className="text-lg font-semibold text-white">{data.title}</h3>
      <p className="text-sm text-gray-400 mb-3">{data.description}</p>

      {/* 🔥 BUTTON TO TRIGGER TOAST */}
      <button
        onClick={handleClick}
        className="w-full py-2 bg-red-500 hover:bg-red-600 rounded-lg text-sm"
      >
        Show Toast
      </button>

    </div>
  );
};

export default FailedTask;