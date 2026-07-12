import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Home() {
  const navigate = useNavigate();

  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await API.get("/vehicles");
      setVehicles(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load vehicles");
    }
  };

  const purchaseVehicle = async (id) => {
    try {
      await API.post(`/vehicles/${id}/purchase`);

      alert("Vehicle purchased successfully");

      fetchVehicles();
    } catch (error) {
      alert(error.response?.data?.message || "Purchase failed");
    }
  };

  const filteredVehicles = vehicles.filter((vehicle) => {
    return (
      vehicle.make.toLowerCase().includes(search.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(search.toLowerCase()) ||
      vehicle.category.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-8 py-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-5xl font-bold">Vehicle Inventory</h1>

            <p className="text-zinc-400 mt-2">Welcome back, {user?.name}</p>
          </div>

          {user?.role === "admin" && (
            <div className="bg-amber-500 text-black px-5 py-2 rounded-full font-semibold">
              ADMIN
            </div>
          )}
        </div>

        {/* Search */}
        <div className="mb-10">
          <input
            type="text"
            placeholder="Search by make, model or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Vehicle Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVehicles.length === 0 ? (
            <div className="text-zinc-400 text-xl">No vehicles found.</div>
          ) : (
            filteredVehicles.map((vehicle) => (
              <div
                key={vehicle._id}
                className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-amber-400 transition duration-300"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">
                    {vehicle.make} {vehicle.model}
                  </h2>

                  <span className="bg-zinc-800 px-3 py-1 rounded-full text-sm text-zinc-300">
                    {vehicle.category}
                  </span>
                </div>

                <div className="space-y-3">
                  <p className="text-zinc-400">Price</p>

                  <h3 className="text-4xl font-bold text-amber-400">
                    ₹{vehicle.price.toLocaleString()}
                  </h3>

                  <p className="text-zinc-300">
                    Available Stock:
                    <span className="ml-2 text-white font-bold">
                      {vehicle.quantity}
                    </span>
                  </p>

                  <button
                    disabled={vehicle.quantity === 0}
                    onClick={() => purchaseVehicle(vehicle._id)}
                    className={`w-full mt-5 py-3 rounded-2xl font-bold transition ${
                      vehicle.quantity === 0
                        ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                        : "bg-amber-500 text-black hover:bg-amber-400"
                    }`}
                  >
                    {vehicle.quantity === 0
                      ? "Out Of Stock"
                      : "Purchase Vehicle"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
