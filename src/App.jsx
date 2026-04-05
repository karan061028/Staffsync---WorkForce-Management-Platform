import React, { useState, useEffect, useContext } from "react";
import Login from "./components/Auth/Login";
import EmployeeDashboard from "./components/DashBoard/EmployeeDashboard";
import AdminDashboard from "./components/DashBoard/AdminDashboard";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const [darkMode, setDarkMode] = useState(true);

  // ❌ removed role (unused)
  // ❌ removed isLoggedIn state

  const { currentUser, setCurrentUser } = useContext(AuthContext);

  // 🔥 AUTO LOGIN (NEW)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme !== null) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(darkMode));
  }, [darkMode]);

  // 🔥 LOGOUT FIX
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  return (
    <div
      className="
      h-screen text-white
      bg-gradient-to-br 
      from-[#020617] 
      via-[#0f172a] 
      to-[#1e3a8a]
      "
    >
      <Toaster
        position="top-right"
        gutter={12}
        containerStyle={{
          top: 20,
          right: 20,
        }}
        toastOptions={{
          duration: 3000,
          style: {
            background: "rgba(15, 23, 42, 0.85)",
            color: "#fff",
            backdropFilter: "blur(14px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "14px",
            padding: "14px 18px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
          },
        }}
      />

      {currentUser ? (
        <div className="h-full">

          {/* ✅ ROLE BASED */}
          {currentUser.role === "admin" ? (
            <AdminDashboard changeUser={handleLogout} />
          ) : (
            <EmployeeDashboard
              data={currentUser}
              changeUser={handleLogout}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          )}

        </div>
      ) : (
        <div className="h-full flex items-center justify-center">
          <Login />
        </div>
      )}
    </div>
  );
};

export default App;