import React, { useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// 🎨 Colors
const COLORS = ["#60a5fa", "#4ade80", "#c084fc", "#f87171"];

const AdminCharts = ({ employees = [] }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  // ================= DATA =================
  const data = useMemo(() => {
    let totalNew = 0;
    let totalCompleted = 0;
    let totalActive = 0;
    let totalFailed = 0;

    employees.forEach((emp) => {
      emp?.tasks?.forEach((task) => {
        if (task.status === "new") totalNew++;
        if (task.status === "completed") totalCompleted++;
        if (task.status === "active") totalActive++;
        if (task.status === "failed") totalFailed++;
      });
    });

    return [
      { name: "New", value: totalNew },
      { name: "Completed", value: totalCompleted },
      { name: "Active", value: totalActive },
      { name: "Failed", value: totalFailed },
    ];
  }, [employees]);

  const total = data.reduce((sum, d) => sum + d.value, 0);

  // 🔥 SAFE PIE DATA (no invisible issue)
  const pieData = [
    { name: "New", value: data[0]?.value || 1 },
    { name: "Completed", value: data[1]?.value || 1 },
    { name: "Active", value: data[2]?.value || 1 },
    { name: "Failed", value: data[3]?.value || 1 },
  ];

  // 🔥 SAFE BAR DATA
  const barData = data.map((d) => ({
    ...d,
    value: d.value === 0 ? 0.5 : d.value,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* ================= PIE ================= */}
      <div className="p-6 rounded-2xl bg-[#020617] border border-white/10">

        <h3 className="text-sm text-gray-300 mb-4">
          ✨ Task Distribution
        </h3>

        <div className="flex justify-center items-center relative">

          {/* 🔥 FIX: NO ResponsiveContainer */}
          <PieChart width={300} height={300}>
            <Pie
              data={pieData}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={110}
              paddingAngle={4}
              onMouseEnter={(_, i) => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {pieData.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                  stroke="#020617"
                  strokeWidth={3}
                  style={{
                    transform:
                      activeIndex === index ? "scale(1.05)" : "scale(1)",
                    transformOrigin: "center",
                    transition: "0.3s",
                  }}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>

          {/* CENTER TEXT */}
          <div className="absolute text-center pointer-events-none">
            <h2 className="text-white text-3xl font-bold">{total}</h2>
            <p className="text-gray-400 text-xs">Total Tasks</p>
          </div>

        </div>

        {/* LEGEND */}
        <div className="flex justify-around mt-4 text-xs text-gray-300">
          {data.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ background: COLORS[i] }}
              ></span>
              {item.name}
            </div>
          ))}
        </div>

      </div>

      {/* ================= BAR ================= */}
      <div className="p-6 rounded-2xl bg-[#020617] border border-white/10 min-w-0">

        <h3 className="text-sm text-gray-300 mb-4">
          📊 Task Overview
        </h3>

        <div className="w-full h-[300px] min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" allowDecimals={false} />
              <Tooltip />

              <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                {barData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
};

export default AdminCharts;