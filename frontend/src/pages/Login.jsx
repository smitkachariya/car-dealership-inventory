import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#09090B] flex items-center justify-center px-6">
      {/* Background Effects */}
      <div className="absolute top-[-150px] left-[-150px] h-[400px] w-[400px] rounded-full bg-amber-500/20 blur-3xl"></div>

      <div className="absolute bottom-[-150px] right-[-150px] h-[400px] w-[400px] rounded-full bg-orange-600/20 blur-3xl"></div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b22_1px,transparent_1px),linear-gradient(to_bottom,#18181b22_1px,transparent_1px)] bg-[size:70px_70px]"></div>

      <div className="relative z-10 w-full max-w-5xl rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900/50 backdrop-blur-xl shadow-[0_0_60px_rgba(0,0,0,0.6)] grid lg:grid-cols-2">
        {/* LEFT */}
        <div className="hidden lg:flex flex-col justify-center p-16 border-r border-zinc-800">
          <p className="text-amber-400 uppercase tracking-[6px] text-sm mb-6">
            Car Dealership Inventory
          </p>

          <h1 className="text-6xl font-bold leading-tight text-white">
            Manage your
            <br />
            inventory
            <br />
            <span className="text-amber-400">intelligently.</span>
          </h1>

          <p className="mt-8 text-zinc-400 text-lg leading-8">
            A modern inventory platform built for dealerships to manage stock,
            purchases and operations from one dashboard.
          </p>

          <div className="flex gap-4 mt-10">
            <div className="bg-zinc-800/60 border border-zinc-700 px-5 py-3 rounded-xl text-white font-semibold">
              🚗 Vehicles
            </div>

            <div className="bg-zinc-800/60 border border-zinc-700 px-5 py-3 rounded-xl text-white font-semibold">
              📦 Inventory
            </div>

            <div className="bg-zinc-800/60 border border-zinc-700 px-5 py-3 rounded-xl text-white font-semibold">
              💰 Purchases
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="p-12 flex flex-col justify-center">
          <p className="text-amber-400 uppercase tracking-[4px] text-sm mb-3">
            Welcome Back
          </p>

          <h2 className="text-5xl font-bold text-white mb-3">Sign In</h2>

          <p className="text-zinc-400 mb-10">
            Access your dealership dashboard.
          </p>

          <div className="space-y-5">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
            />

            <button className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-4 rounded-2xl transition-all duration-300">
              Sign In
            </button>
          </div>

          <p className="mt-8 text-center text-zinc-400">
            Don't have an account?
            <Link to="/register" className="text-amber-400 ml-2 font-semibold">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
