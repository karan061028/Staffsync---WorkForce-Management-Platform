import React from "react";
import { motion } from "framer-motion";

const CompleteTask = ({ data }) => {
     const handleClick = () => {
    toast.success("Already completed ✅");
  };
  return (
    <div className="p-5 rounded-xl bg-purple-500/10 border border-purple-500/20 backdrop-blur-lg relative">

      <div className="absolute left-0 top-0 h-full w-1 bg-purple-500"></div>

      <div className="flex justify-between mb-2">
        <span className="text-xs px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full">
          Completed
        </span>
        <span className="text-xs text-gray-400">{data.date}</span>
      </div>

      <h3 className="text-lg font-semibold text-white">{data.title}</h3>
      <p className="text-sm text-gray-400">{data.description}</p>

    </div>
  );
};

export default CompleteTask;