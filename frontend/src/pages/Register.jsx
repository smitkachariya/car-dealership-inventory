import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
        },
      );
      console.log(response.data);

      // Store token
      localStorage.setItem("token", response.data.token);
      console.log("Stored Token:", localStorage.getItem("token"));
      // Store user
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: response.data.name,
          role: response.data.role,
        }),
      );

      // Redirect according to role
      if (response.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#09090B] flex items-center justify-center px-6">
      <div className="absolute top-[-150px] left-[-150px] h-[400px] w-[400px] rounded-full bg-amber-500/20 blur-3xl"></div>

      <div className="absolute bottom-[-150px] right-[-150px] h-[400px] w-[400px] rounded-full bg-orange-600/20 blur-3xl"></div>

      <div className="relative z-10 w-full max-w-5xl rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900/50 backdrop-blur-xl shadow-[0_0_60px_rgba(0,0,0,0.6)] grid lg:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-center p-16 border-r border-zinc-800">
          <p className="text-amber-400 uppercase tracking-[6px] text-sm mb-6">
            CAR DEALERSHIP INVENTORY
          </p>

          <h1 className="text-6xl font-bold leading-tight text-white">
            Create your
            <br />
            dealership
            <br />
            <span className="text-amber-400">account.</span>
          </h1>

          <p className="mt-8 text-zinc-400 text-lg leading-8">
            Start managing vehicles, inventory and purchases from a single
            dashboard.
          </p>

          <div className="flex gap-4 mt-10">
            <div className="bg-zinc-800/60 border border-zinc-700 px-5 py-4 rounded-xl text-white font-semibold">
              🚗 Vehicles
            </div>

            <div className="bg-zinc-800/60 border border-zinc-700 px-5 py-4 rounded-xl text-white font-semibold">
              📦 Inventory
            </div>

            <div className="bg-zinc-800/60 border border-zinc-700 px-5 py-4 rounded-xl text-white font-semibold">
              💰 Purchases
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-12 flex flex-col justify-center">
          <p className="text-amber-400 uppercase tracking-[4px] text-sm mb-3">
            REGISTER HERE
          </p>

          <h2 className="text-5xl font-bold text-white mb-3">Create Account</h2>

          <p className="text-zinc-400 mb-10">
            Start managing your dealership inventory today.
          </p>

          <form onSubmit={handleRegister} className="space-y-5">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
            />

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
              Create Account
            </button>
          </form>

          <p className="mt-8 text-center text-zinc-400">
            Already have an account?
            <Link
              to="/login"
              className="text-amber-400 ml-2 font-semibold hover:text-amber-300"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
