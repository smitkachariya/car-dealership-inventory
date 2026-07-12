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

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await API.get("/vehicles");
      setVehicles(res.data);
    } catch (error) {
      console.log(error);
    }
  };

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
          category: formData.category,
          price: Number(formData.price),
        });

        alert("Vehicle updated successfully");
      } else {
        await API.post("/vehicles", {
          make: formData.make,
          model: formData.model,
          category: formData.category,
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
      make: vehicle.make,
      model: vehicle.model,
      category: vehicle.category,
      price: vehicle.price,
      quantity: vehicle.quantity,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this vehicle?");

    if (!confirmDelete) return;

    try {
      await API.delete(`/vehicles/${id}`);

      alert("Vehicle deleted successfully");

      fetchVehicles();
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  const handleRestock = async (id) => {
    const quantity = prompt("Enter quantity to add:");

    if (!quantity) return;

    try {
      await API.post(`/vehicles/${id}/restock`, {
        quantity: Number(quantity),
      });

      alert("Vehicle restocked successfully");

      fetchVehicles();
    } catch (error) {
      alert(error.response?.data?.message || "Restock failed");
    }
  };

  const cancelEdit = () => {
    setEditingVehicle(null);

    setFormData({
      make: "",
      model: "",
      category: "",
      price: "",
      quantity: "",
    });
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
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 mb-10">
          <h2 className="text-3xl font-bold mb-8">
            {editingVehicle ? "Update Vehicle" : "Add Vehicle"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Add Mode */}
            {!editingVehicle && (
              <>
                <input
                  type="text"
                  name="make"
                  placeholder="Make"
                  value={formData.make}
                  onChange={handleChange}
                  className="bg-zinc-800 border border-zinc-700 rounded-xl p-4"
                  required
                />

                <input
                  type="text"
                  name="model"
                  placeholder="Model"
                  value={formData.model}
                  onChange={handleChange}
                  className="bg-zinc-800 border border-zinc-700 rounded-xl p-4"
                  required
                />
              </>
            )}

            {/* Edit Mode */}
            {editingVehicle && (
              <div className="md:col-span-2 bg-zinc-800 border border-zinc-700 rounded-xl p-5">
                <p className="text-zinc-400 text-sm mb-2">Editing Vehicle</p>

                <h3 className="text-2xl font-bold">
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

            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl py-4"
            >
              {editingVehicle ? "Update Vehicle" : "Add Vehicle"}
            </button>

            {editingVehicle && (
              <button
                type="button"
                onClick={cancelEdit}
                className="bg-zinc-700 hover:bg-zinc-600 rounded-xl font-bold py-4"
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
              <h2 className="text-2xl font-bold">
                {vehicle.make} {vehicle.model}
              </h2>

              <p className="text-zinc-400 mt-2">Category: {vehicle.category}</p>

              <p className="text-amber-400 text-3xl font-bold mt-4">
                ₹{vehicle.price.toLocaleString()}
              </p>

              <p className="mt-4">
                Stock:
                <span className="font-bold ml-2">{vehicle.quantity}</span>
              </p>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => handleEdit(vehicle)}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-semibold"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleRestock(vehicle._id)}
                  className="flex-1 bg-green-600 hover:bg-green-500 py-3 rounded-xl font-semibold"
                >
                  Restock
                </button>

                <button
                  onClick={() => handleDelete(vehicle._id)}
                  className="flex-1 bg-red-600 hover:bg-red-500 py-3 rounded-xl font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
