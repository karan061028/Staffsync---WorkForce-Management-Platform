import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const CreateTask = () => {
  // ❌ OLD (remove this)
  // const [userData, setUserData] = useContext(AuthContext);

  // ✅ NEW (correct)
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [asignTo, setAsignTo] = useState("");
  const [category, setCategory] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    const newTask = {
      title: taskTitle,
      description: taskDescription,
      date: taskDate,
      category,
      status: "new", // 🔥 simplified
    };

    // ❌ OLD LOGIC (remove this)
    // const data = [...userData];
    // data.forEach(...)

    // ✅ NEW LOGIC (update current user only)
    const updatedUser = {
      ...currentUser,
      tasks: [...(currentUser.tasks || []), newTask],
    };

    setCurrentUser(updatedUser);

    // reset fields
    setTaskTitle("");
    setCategory("");
    setAsignTo("");
    setTaskDate("");
    setTaskDescription("");
  };

  return (
    <div className="p-4 bg-gradient-to-br from-[#0f172a] to-[#020617] rounded-2xl border border-white/10 shadow-xl">

      <form onSubmit={submitHandler} className="flex flex-wrap gap-3">

        {/* LEFT */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">

          {/* Task Title */}
          <div className="relative">
            <input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              required
              className="peer w-full bg-transparent border border-gray-600 rounded-lg px-3 pt-5 pb-2 text-white placeholder-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none"
              placeholder="Task Title"
            />
            <label className="absolute left-3 top-2 text-gray-400 text-sm transition-all 
              peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
              peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-400">
              Task Title
            </label>
          </div>

          {/* Date */}
          <input
            type="date"
            value={taskDate}
            onChange={(e) => setTaskDate(e.target.value)}
            className="w-full bg-transparent border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none"
          />

          {/* Assign */}
          <div className="relative">
            <input
              value={asignTo}
              onChange={(e) => setAsignTo(e.target.value)}
              required
              className="peer w-full bg-transparent border border-gray-600 rounded-lg px-3 pt-5 pb-2 text-white placeholder-transparent focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 outline-none"
              placeholder="Assign To"
            />
            <label className="absolute left-3 top-2 text-gray-400 text-sm transition-all 
              peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
              peer-focus:top-2 peer-focus:text-sm peer-focus:text-purple-400">
              Assign to
            </label>
          </div>

          {/* Category */}
          <div className="relative">
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="peer w-full bg-transparent border border-gray-600 rounded-lg px-3 pt-5 pb-2 text-white placeholder-transparent focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 outline-none"
              placeholder="Category"
            />
            <label className="absolute left-3 top-2 text-gray-400 text-sm transition-all 
              peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
              peer-focus:top-2 peer-focus:text-sm peer-focus:text-pink-400">
              Category
            </label>
          </div>

        </div>

        {/* RIGHT */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">

          {/* Description */}
          <div className="relative">
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              required
              className="peer w-full h-28 bg-transparent border border-gray-600 rounded-lg px-3 pt-5 pb-2 text-white placeholder-transparent focus:border-green-500 focus:ring-2 focus:ring-green-500/30 outline-none"
              placeholder="Description"
            />
            <label className="absolute left-3 top-2 text-gray-400 text-sm transition-all 
              peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
              peer-focus:top-2 peer-focus:text-sm peer-focus:text-green-400">
              Description
            </label>
          </div>

          <button className="mt-2 py-2 rounded-xl text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:scale-105 transition">
            🚀 Create Task
          </button>

        </div>

      </form>
    </div>
  );
};

export default CreateTask;