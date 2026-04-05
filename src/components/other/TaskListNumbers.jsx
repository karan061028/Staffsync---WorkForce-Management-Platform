import React from "react";

const TaskListNumbers = ({ data }) => {

  // 🔥 Get tasks safely
  const tasks = data?.tasks || [];

  // 🔥 Calculate counts dynamically
  const newTask = tasks.filter(t => t.status === "new").length;
  const completed = tasks.filter(t => t.status === "completed").length;
  const active = tasks.filter(t => t.status === "active").length;
  const failed = tasks.filter(t => t.status === "failed").length;

  const stats = [
    {
      label: "New Tasks",
      value: newTask,
      color: "from-blue-500/20 to-blue-600/10",
      border: "border-blue-500/30",
    },
    {
      label: "Completed",
      value: completed,
      color: "from-green-500/20 to-green-600/10",
      border: "border-green-500/30",
    },
    {
      label: "Active Tasks",
      value: active,
      color: "from-yellow-500/20 to-yellow-600/10",
      border: "border-yellow-500/30",
    },
    {
      label: "Failed",
      value: failed,
      color: "from-red-500/20 to-red-600/10",
      border: "border-red-500/30",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
      {stats.map((item, index) => (
        <div
          key={index}
          className={`rounded-2xl p-6 bg-gradient-to-br ${item.color} backdrop-blur-xl border ${item.border}
          shadow-lg hover:shadow-xl hover:scale-[1.04] transition-all duration-300`}
        >
          <h2 className="text-4xl font-bold text-white">
            {item.value}
          </h2>
          <p className="text-gray-300 mt-2 text-sm tracking-wide">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TaskListNumbers;