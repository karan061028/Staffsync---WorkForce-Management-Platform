import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import AcceptTask from "./AcceptTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";
import NewTask from "./NewTask";

const TaskList = ({ data }) => {
  const [tasks, setTasks] = useState(data?.tasks || []);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    setTasks(data?.tasks || []);
  }, [data]);

const updateTaskStatus = async (taskId, status) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        userId: user?._id,
        taskId,
        status,
      }),
    });

    const result = await res.json();

    // ✅ UPDATE UI
    setTasks((prev) =>
      prev.map((t) =>
        t._id === taskId ? { ...t, status } : t
      )
    );

    // ✅ TOAST (SAFE)
    if (status === "completed") {
      toast.success("Task Completed ✅");
    } else if (status === "active") {
      toast.success("Task Accepted 🚀");
    } else if (status === "failed") {
      toast.error("Task Failed ❌");
    }

  } catch (err) {
    toast.error("Something went wrong ❌");
    console.log(err);
  }
};
  const handleDrag = (result) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);

    setTasks(items);
  };

  // 🔥 SEARCH + FILTER
  const filteredTasks = tasks.filter((task) => {
    const matchSearch = task.title
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchFilter =
      filter === "all" || task.status === filter;

    return matchSearch && matchFilter;
  });

  // 🎨 PRIORITY COLORS
  const getPriorityColor = (priority) => {
    if (priority === "high") return "text-red-400";
    if (priority === "medium") return "text-yellow-400";
    return "text-green-400";
  };

  return (
    <div className="flex flex-col h-full min-h-0">

      {/* 🔍 SEARCH + FILTER BAR */}
      <div className="shrink-0 px-4 py-3 border-b border-white/10 space-y-3">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-white/10 text-white text-sm outline-none"
        />

        {/* FILTER */}
        <div className="flex gap-2">
          {["all", "active", "completed", "failed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`
                px-3 py-1 rounded-full text-xs capitalize transition
                ${
                  filter === f
                    ? "bg-blue-500 text-white"
                    : "bg-white/10 text-gray-300"
                }
              `}
            >
              {f}
            </button>
          ))}
        </div>

      </div>

      {/* 🔥 TASK LIST */}
      <DragDropContext onDragEnd={handleDrag}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex-1 min-h-0 overflow-y-auto px-4 py-4 space-y-3"
            >

              {filteredTasks.length === 0 && (
                <div className="text-center text-gray-400 mt-10">
                  🚀 No tasks found
                </div>
              )}

              {filteredTasks.map((task, index) => {
                let Component;

                if (task.status === "active") Component = AcceptTask;
                else if (task.status === "completed") Component = CompleteTask;
                else if (task.status === "failed") Component = FailedTask;
                else Component = NewTask;

                return (
                  <Draggable
                    key={task._id}
                    draggableId={task._id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <motion.div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`
                          relative
                          ${snapshot.isDragging ? "scale-105" : ""}
                        `}
                      >

                        {/* 🔥 PRIORITY BADGE */}
                        <span className={`
                          absolute top-2 right-2 text-xs font-semibold
                          ${getPriorityColor(task.priority)}
                        `}>
                          {task.priority || "low"}
                        </span>

                        <Component
                          data={task}
                          updateTask={(status) =>
                            updateTaskStatus(task._id, status)
                          }
                        />

                      </motion.div>
                    )}
                  </Draggable>
                );
              })}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

    </div>
  );
};

export default TaskList;