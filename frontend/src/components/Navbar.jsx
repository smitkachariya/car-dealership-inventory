import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-zinc-900 border-b border-zinc-800 px-8 py-4 flex justify-between">
      <h1 className="text-white text-2xl font-bold">
        {" "}
        🚗 Car Dealership Inventory
      </h1>

      <div className="flex items-center gap-6">
        <p className="text-zinc-300">
          Welcome, {user?.name || user?.user?.name}
        </p>

        {user?.role === "admin" && (
          <Link
            to="/admin"
            className="bg-amber-500 hover:bg-amber-400 text-black px-4 py-2 rounded-xl font-semibold"
          >
            Admin Panel
          </Link>
        )}

        <button
          onClick={logout}
          className="bg-red-500 px-4 py-2 rounded-lg text-white"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
