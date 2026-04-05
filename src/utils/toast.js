import toast from "react-hot-toast";

// 🔊 optional sound
const playSound = () => {
  const audio = new Audio("/success.mp3");
  audio.volume = 0.4;
  audio.play();
};

// 🚀 SUCCESS
export const toastSuccess = (msg) => {
  playSound();

  toast.custom((t) => (
    <div
      className={`px-5 py-3 rounded-xl text-white 
      bg-gradient-to-r from-blue-500 to-purple-600 
      shadow-lg shadow-blue-500/30
      flex items-center gap-3
      transition-all duration-300
      ${t.visible ? "animate-[slideIn_.3s_ease]" : "opacity-0"}`}
    >
      🚀 <span className="font-medium">{msg}</span>
    </div>
  ));
};

// ❌ ERROR
export const toastError = (msg) => {
  toast.custom((t) => (
    <div
      className={`px-5 py-3 rounded-xl text-white 
      bg-gradient-to-r from-red-500 to-pink-600 
      shadow-lg shadow-red-500/30
      flex items-center gap-3
      ${t.visible ? "animate-[slideIn_.3s_ease]" : "opacity-0"}`}
    >
      ❌ <span>{msg}</span>
    </div>
  ));
};

// ✨ INFO
export const toastInfo = (msg) => {
  toast.custom((t) => (
    <div
      className={`px-5 py-3 rounded-xl text-white 
      bg-white/10 backdrop-blur-xl border border-white/10
      flex items-center gap-3
      ${t.visible ? "animate-[slideIn_.3s_ease]" : "opacity-0"}`}
    >
      ✨ <span>{msg}</span>
    </div>
  ));
};