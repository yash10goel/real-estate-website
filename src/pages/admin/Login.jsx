import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
} from "../../utils/auth";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      email === ADMIN_EMAIL &&
      password === ADMIN_PASSWORD
    ) {
      localStorage.setItem("adminAuth", "true");
      navigate("/admin/userinfo");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0F172A] flex items-center justify-center px-5">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[350px] h-[350px] bg-emerald-500/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/10 blur-[140px] rounded-full" />

      <div
        className="
          relative
          z-10
          w-full
          max-w-md
          bg-white/5
          backdrop-blur-xl
          border
          border-white/10
          rounded-3xl
          p-8
          shadow-[0_20px_60px_rgba(0,0,0,0.4)]
        "
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div
            className="
              w-20
              h-20
              mx-auto
              rounded-2xl
              bg-gradient-to-br
              from-emerald-500
              to-emerald-700
              flex
              items-center
              justify-center
              text-white
              text-3xl
              font-bold
              shadow-lg
            "
          >
            R
          </div>

          <h1 className="text-3xl font-bold text-white mt-5">
            RKGC Admin
          </h1>

          <p className="text-slate-400 mt-2">
            Login to access contact leads
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="text-slate-300 text-sm block mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="
                w-full
                bg-[#111827]
                border
                border-slate-700
                rounded-xl
                px-4
                py-3
                text-white
                outline-none
                focus:border-emerald-500
              "
            />
          </div>

          <div className="mb-6">
            <label className="text-slate-300 text-sm block mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="
                w-full
                bg-[#111827]
                border
                border-slate-700
                rounded-xl
                px-4
                py-3
                text-white
                outline-none
                focus:border-emerald-500
              "
            />
          </div>

          <button
            type="submit"
            className="
              w-full
              py-3
              rounded-xl
              bg-emerald-600
              hover:bg-emerald-700
              text-white
              font-semibold
              transition-all
              duration-300
              shadow-lg
            "
          >
            Login to Dashboard
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-500 text-sm">
            RKGC Group Admin Panel
          </p>
        </div>
      </div>
    </div>
  );
}