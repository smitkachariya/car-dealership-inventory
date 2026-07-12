import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

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
        <p className="text-zinc-300">Welcome, {user?.name}</p>

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
