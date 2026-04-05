import React, { useEffect, useState } from "react";
import Header from "../other/Header";
import TaskListNumbers from "../other/TaskListNumbers";
import TaskList from "../TaskList/TaskList";

const EmployeeDashboard = (props) => {
  const [tasks, setTasks] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/tasks/${user._id}`,
        {
          headers: { Authorization: token },
        }
      );
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
    const interval = setInterval(fetchTasks, 5000);
    return () => clearInterval(interval);
  }, []);

  const taskCounts = {
    newTask: tasks.filter(t => t.status === "new").length,
    completed: tasks.filter(t => t.status === "completed").length,
    active: tasks.filter(t => t.status === "active").length,
    failed: tasks.filter(t => t.status === "failed").length,
  };

  const updatedData = {
    ...props.data,
    tasks,
    taskCounts,
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden text-white bg-[#020617]">

      {/* HEADER */}
      <div className="shrink-0 p-4 border-b border-white/10">
        <Header
          changeUser={props.changeUser}
          data={updatedData}
          darkMode={props.darkMode}
          setDarkMode={props.setDarkMode}
        />
      </div>

      {/* STATS */}
      <div className="shrink-0 p-4 border-b border-white/10">
        <TaskListNumbers data={updatedData} />
      </div>

      {/* TASK SECTION */}
      <div className="flex-1 min-h-0 p-4">
        <div className="h-full flex flex-col rounded-xl bg-white/5 border border-white/10 p-4">

          {/* TITLE */}
          <div className="shrink-0 mb-3">
            <h2 className="text-lg font-semibold">📋 Your Tasks</h2>
          </div>

          {/* TASK LIST (SCROLL INSIDE) */}
          <div className="flex-1 min-h-0">
            <TaskList data={updatedData} />
          </div>

        </div>
      </div>

    </div>
  );
};

export default EmployeeDashboard;