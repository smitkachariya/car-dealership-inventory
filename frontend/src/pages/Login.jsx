import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-5xl bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl grid lg:grid-cols-2">
        {/* LEFT SECTION */}
        <div className="hidden lg:flex flex-col justify-center p-12 border-r border-zinc-800">
          <p className="text-amber-400 uppercase tracking-[6px] text-sm mb-6">
            CAR DEALERSHIP INVENTORY
          </p>

          <h1 className="text-6xl font-bold leading-tight text-white">
            Manage your
            <br />
            inventory
            <br />
            <span className="text-amber-400">smarter.</span>
          </h1>

          <p className="mt-8 text-zinc-400 text-lg leading-8">
            A modern dealership platform to manage vehicles, inventory and
            purchases from a single dashboard.
          </p>

          <div className="flex gap-4 mt-12">
            <div className="bg-zinc-800/60 border border-zinc-700 px-5 py-4 rounded-xl text-white font-semibold">
              <span className="text-amber-400 mr-2">🚗</span>
              Vehicles
            </div>

            <div className="bg-zinc-800/60 border border-zinc-700 px-5 py-4 rounded-xl text-white font-semibold">
              <span className="text-amber-400 mr-2">📦</span>
              Inventory
            </div>

            <div className="bg-zinc-800/60 border border-zinc-700 px-5 py-4 rounded-xl text-white font-semibold">
              <span className="text-amber-400 mr-2">💰</span>
              Purchases
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="p-12 flex flex-col justify-center">
          <p className="text-amber-400 uppercase tracking-[4px] text-sm mb-3">
            Welcome Back
          </p>

          <h2 className="text-5xl font-bold text-white mb-3">Sign In</h2>

          <p className="text-zinc-400 mb-10">Login to continue.</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
            />

            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-4 rounded-2xl transition-all duration-300"
            >
              Sign In
            </button>
          </form>

          <p className="mt-8 text-center text-zinc-400">
            Don't have an account?
            <Link
              to="/register"
              className="text-amber-400 ml-2 font-semibold hover:text-amber-300"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
