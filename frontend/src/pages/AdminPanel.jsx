import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function AdminPanel() {
  const [vehicles, setVehicles] = useState([]);
  const [editingVehicle, setEditingVehicle] = useState(null);

  const [formData, setFormData] = useState({
    make: "",
    model: "",
    category: "",
    price: "",
    quantity: "",
  });

  const fetchVehicles = async () => {
    try {
      const response = await API.get("/vehicles");
      setVehicles(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch vehicles");
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingVehicle) {
        await API.put(`/vehicles/${editingVehicle._id}`, {
          ...formData,
          price: Number(formData.price),
          quantity: Number(formData.quantity),
        });

        alert("Vehicle updated successfully");
      } else {
        await API.post("/vehicles", {
          ...formData,
          price: Number(formData.price),
          quantity: Number(formData.quantity),
        });

        alert("Vehicle added successfully");
      }

      setFormData({
        make: "",
        model: "",
        category: "",
        price: "",
        quantity: "",
      });

      setEditingVehicle(null);

      fetchVehicles();
    } catch (error) {
      alert(error.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);

    setFormData({
      //   make: vehicle.make,
      //   model: vehicle.model,
      category: vehicle.category,
      price: vehicle.price,
      //   quantity: vehicle.quantity,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this vehicle?")) {
      return;
    }

    try {
      await API.delete(`/vehicles/${id}`);

      alert("Vehicle deleted successfully");

      fetchVehicles();
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  const handleRestock = async (id) => {
    const amount = prompt("Enter quantity to add:");

    if (!amount) return;

    try {
      await API.post(`/vehicles/${id}/restock`, {
        quantity: Number(amount),
      });

      alert("Vehicle restocked");

      fetchVehicles();
    } catch (error) {
      alert(error.response?.data?.message || "Restock failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-8 py-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold">Admin Dashboard</h1>

          <p className="text-zinc-400 mt-2">Manage inventory and vehicles.</p>
        </div>

        {/* Form */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mb-10">
          <h2 className="text-3xl font-bold mb-6">
            {editingVehicle ? "Update Vehicle" : "Add Vehicle"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {editingVehicle && (
              <div className="md:col-span-2 bg-zinc-800 border border-zinc-700 rounded-xl p-5">
                <p className="text-zinc-400 text-sm mb-2">Editing Vehicle</p>

                <h3 className="text-2xl font-bold text-white">
                  {editingVehicle.make} {editingVehicle.model}
                </h3>
              </div>
            )}

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="bg-zinc-800 border border-zinc-700 rounded-xl p-4"
              required
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="bg-zinc-800 border border-zinc-700 rounded-xl p-4"
              required
            />

            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="bg-zinc-800 border border-zinc-700 rounded-xl p-4"
              required
            />

            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-400 text-black rounded-xl font-bold"
            >
              {editingVehicle ? "Update Vehicle" : "Add Vehicle"}
            </button>

            {editingVehicle && (
              <button
                type="button"
                onClick={() => {
                  setEditingVehicle(null);

                  setFormData({
                    make: "",
                    model: "",
                    category: "",
                    price: "",
                    quantity: "",
                  });
                }}
                className="bg-zinc-700 hover:bg-zinc-600 rounded-xl font-bold"
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        {/* Vehicle List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle._id}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">
                    {vehicle.make} {vehicle.model}
                  </h2>

                  <p className="text-zinc-400 mt-2">
                    Category: {vehicle.category}
                  </p>

                  <p className="text-amber-400 text-2xl font-bold mt-3">
                    ₹{vehicle.price.toLocaleString()}
                  </p>

                  <p className="mt-3">
                    Stock:
                    <span className="ml-2 font-bold">{vehicle.quantity}</span>
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => handleEdit(vehicle)}
                    className="bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-xl"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleRestock(vehicle._id)}
                    className="bg-green-600 hover:bg-green-500 px-5 py-2 rounded-xl"
                  >
                    Restock
                  </button>

                  <button
                    onClick={() => handleDelete(vehicle._id)}
                    className="bg-red-600 hover:bg-red-500 px-5 py-2 rounded-xl"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
