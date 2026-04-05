import React, { useState, useEffect, useRef } from "react";
import AdminCharts from "../AdminCharts/AdminCharts";
import toast from "react-hot-toast";
import notificationSound from "../../assets/notification.mp3";

const AdminDashboard = ({ changeUser }) => {
  const [employees, setEmployees] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const [prevTasks, setPrevTasks] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showPanel, setShowPanel] = useState(false);

  const panelRef = useRef(null);

  const token = localStorage.getItem("token");

  // 🔥 FETCH + NOTIFICATIONS
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users", {
          headers: { Authorization: token },
        });

        const data = await res.json();
        setEmployees(data);

        const currentTasks = [];

        data.forEach((user) => {
          user.tasks?.forEach((task) => {
            currentTasks.push({
              ...task,
              userName: user.name,
            });
          });
        });

        const newCompletedTasks = currentTasks.filter(
          (task) =>
            task.status === "completed" &&
            !prevTasks.find(
              (t) => t._id === task._id && t.status === "completed"
            )
        );

        if (newCompletedTasks.length > 0) {
          const audio = new Audio(notificationSound);
          audio.play().catch(() => {});

          newCompletedTasks.forEach((task) => {
            const message = `🎉 ${task.userName} completed "${task.title}"`;

            toast.success(message, {
              style: {
                background: "#0f172a",
                color: "#fff",
                border: "1px solid #22c55e",
              },
            });

            setNotifications((prev) => [
              { id: Date.now() + Math.random(), message },
              ...prev,
            ]);
          });
        }

        setPrevTasks(currentTasks);

      } catch (err) {
        console.log(err);
      }
    };

    fetchEmployees();

    const interval = setInterval(fetchEmployees, 5000);
    return () => clearInterval(interval);

  }, [prevTasks]);

  // 🔥 CLICK OUTSIDE CLOSE
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setShowPanel(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalEmployees = employees.length;

  let totalNew = 0;
  let totalCompleted = 0;
  let totalActive = 0;
  let totalFailed = 0;

  employees.forEach((emp) => {
    emp.tasks?.forEach((task) => {
      if (task.status === "new") totalNew++;
      if (task.status === "completed") totalCompleted++;
      if (task.status === "active") totalActive++;
      if (task.status === "failed") totalFailed++;
    });
  });

  const handleCreateTask = async () => {
    if (!title || !description || !selectedUser) {
      alert("All fields required");
      return;
    }

    try {
      await fetch("http://localhost:5000/api/tasks/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          userId: selectedUser,
          title,
          description,
          date,
        }),
      });

      alert("Task Assigned ✅");
      setTitle("");
      setDescription("");
      setSelectedUser("");
      setDate("");

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen p-6 text-white bg-[radial-gradient(circle_at_top,_#1e1b4b,_#020617)] relative">

      <div className="absolute top-0 left-0 w-full h-[300px] bg-purple-500/20 blur-[120px] opacity-40"></div>

      <div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-[0_0_60px_rgba(139,92,246,0.4)]">

        <div className="bg-[#0b1120]/90 rounded-2xl p-6 overflow-visible">
          {/* HEADER */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">👋 Hello Admin</h1>

            <div className="flex items-center gap-4">

              {/* 🔔 NOTIFICATION */}
              <div className="relative" ref={panelRef}>
                <button
                  onClick={() => setShowPanel(!showPanel)}
                  className="text-xl relative"
                >
                  🔔

                  {notifications.length > 0 && (
                    <span className="absolute -top-2 -right-2 text-xs bg-red-500 px-2 rounded-full">
                      {notifications.length}
                    </span>
                  )}
                </button>

                {showPanel && (
                  <div className="absolute right-0 mt-3 w-80 max-h-[400px] overflow-y-auto bg-[#020617] border border-white/10 rounded-xl shadow-xl z-50">

                    <div className="flex justify-between items-center p-3 border-b border-white/10">
                      <h3 className="text-sm font-semibold">Notifications</h3>

                      <button
                        onClick={() => setNotifications([])}
                        className="text-xs text-red-400 hover:text-red-500"
                      >
                        Clear All
                      </button>
                    </div>

                    <div className="p-2 space-y-2">
                      {notifications.length === 0 ? (
                        <p className="text-center text-gray-400 text-sm py-5">
                          No notifications
                        </p>
                      ) : (
                        notifications.map((n) => (
                          <div
                            key={n.id}
                            className="p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition text-sm"
                          >
                            {n.message}
                          </div>
                        ))
                      )}
                    </div>

                  </div>
                )}
              </div>

              <button
                onClick={changeUser}
                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>

            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
            {[
              { label: "Employees", value: totalEmployees, color: "text-blue-400" },
              { label: "New Tasks", value: totalNew, color: "text-green-400" },
              { label: "Completed", value: totalCompleted, color: "text-indigo-400" },
              { label: "Failed", value: totalFailed, color: "text-red-400" },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-xl bg-gradient-to-br from-[#1e293b]/60 to-[#0f172a]/60 border border-white/10 shadow-lg relative">
                <p className="text-gray-400 text-sm">{item.label}</p>
                <h2 className={`text-3xl font-bold ${item.color}`}>
                  {item.value}
                </h2>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
              </div>
            ))}
          </div>

          {/* MAIN */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <div className="lg:col-span-2 p-6 rounded-2xl bg-gradient-to-br from-[#1e293b]/60 to-[#0f172a]/60 border border-white/10 shadow-xl">
              <h2 className="mb-4 text-lg font-semibold">📊 Task Analytics</h2>
              <AdminCharts employees={employees} />
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-[#1e293b]/60 to-[#0f172a]/60 border border-white/10 shadow-xl p-6 space-y-4">

              <h2 className="text-lg font-semibold">✨ Assign Task</h2>

              <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} className="w-full p-3 rounded bg-black/60 border border-white/10">
                <option value="">Select Employee</option>
                {employees.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.name}
                  </option>
                ))}
              </select>

              <input type="text" placeholder="Task Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 rounded bg-black/60 border border-white/10" />

              <textarea placeholder="Task Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-3 rounded bg-black/60 border border-white/10" />

              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-3 rounded bg-white text-black" />

              <button onClick={handleCreateTask} className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:scale-[1.05] transition shadow-[0_0_30px_rgba(168,85,247,0.6)]">
                🚀 Assign Task
              </button>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;