import React from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const AcceptTask = ({ data, updateTask }) => {
      const handleAccept = () => {
    updateTask("active");
    toast.success("Task Accepted 🚀");
  };
  return (
    <div className="p-5 rounded-xl bg-green-500/10 border border-green-500/20 backdrop-blur-lg hover:scale-[1.02] transition relative">

      <div className="absolute left-0 top-0 h-full w-1 bg-green-500"></div>

      <div className="flex justify-between mb-2">
        <span className="text-xs px-3 py-1 bg-green-500/20 text-green-400 rounded-full">
          Active
        </span>
        <span className="text-xs text-gray-400">{data.date}</span>
      </div>

      <h3 className="text-lg font-semibold text-white">{data.title}</h3>
      <p className="text-sm text-gray-400 mb-4">{data.description}</p>

      <div className="flex gap-2">
        <button
          onClick={() => updateTask("completed")}
          className="flex-1 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-sm"
        >
          Complete
        </button>

        <button
          onClick={() => updateTask("failed")}
          className="flex-1 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-sm"
        >
          Fail
        </button>
      </div>

    </div>
  );
};

export default AcceptTask;