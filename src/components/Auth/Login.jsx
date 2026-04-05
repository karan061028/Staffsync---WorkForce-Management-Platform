import React, { useState, useContext } from "react";
import logo from "../../assets/logo1.png";
import { AuthContext } from "../../context/AuthContext";

const Login = ({ onLogin }) => {
  const { setCurrentUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // 🔥 LOGIN API
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid credentials ❌");
        setLoading(false);
        return;
      }

      // 🔥 Save token
      localStorage.setItem("token", data.token);

      // 🔥 FETCH TASKS FROM BACKEND
      const taskRes = await fetch(
        `http://localhost:5000/api/tasks/${data.user._id}`,
        {
          headers: {
            Authorization: data.token,
          },
        }
      );

      const tasks = await taskRes.json();

      // 🔥 Combine user + tasks
      const fullUser = {
        ...data.user,
        tasks,
      };

      // 🔥 Save user
      setCurrentUser(fullUser);
      localStorage.setItem("user", JSON.stringify(fullUser));

      setLoading(false);

      // 🔥 Trigger login success
      onLogin && onLogin();

    } catch (error) {
      setError("Server error");
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center">

      {/* 🔥 LOGIN CARD */}
      <div
        className="w-[420px] p-10 rounded-3xl 
        bg-white/5 backdrop-blur-2xl 
        border border-white/10 
        shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
      >

        {/* 🔥 LOGO */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-40 h-40 bg-blue-500/20 blur-3xl rounded-full animate-pulse"></div>

            <img
              src={logo}
              alt="StaffSync Logo"
              className="h-20 w-auto object-contain relative z-10 
              drop-shadow-[0_0_25px_rgba(59,130,246,0.6)]"
            />
          </div>

          <p className="text-gray-400 text-sm mt-2">
            Workforce Management Platform
          </p>
        </div>

        {/* Heading */}
        <h2 className="text-xl font-semibold text-white text-center mb-5">
          Sign in to your account
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Email */}
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-xl 
            bg-white/10 text-white placeholder-gray-400 
            border border-white/10 outline-none 
            focus:ring-2 focus:ring-blue-500/50 transition"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl 
              bg-white/10 text-white placeholder-gray-400 
              border border-white/10 outline-none 
              focus:ring-2 focus:ring-blue-500/50 transition"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3 cursor-pointer 
              text-gray-400 hover:text-white text-sm"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`bg-gradient-to-r from-blue-500 to-purple-600 
            hover:from-blue-600 hover:to-purple-700 
            p-3 rounded-xl text-white font-semibold 
            transition-all duration-300 hover:scale-[1.02]
            flex items-center justify-center gap-2
            ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-gray-400 text-sm text-center mt-6">
          Forgot your password?{" "}
          <span className="text-blue-400 cursor-pointer hover:underline">
            Reset
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;