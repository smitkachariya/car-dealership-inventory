function VehicleCard({ vehicle, handlePurchase }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const isAdmin = user?.role === "admin";

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-amber-400 transition duration-300">
      {/* Vehicle Name */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white">
            {vehicle.make} {vehicle.model}
          </h2>

          <p className="text-zinc-400 mt-1">{vehicle.category}</p>
        </div>

        {isAdmin && (
          <span className="bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full">
            ADMIN VIEW
          </span>
        )}
      </div>

      {/* Price */}
      <p className="text-amber-400 text-3xl font-bold mt-4">
        ₹{vehicle.price.toLocaleString()}
      </p>

      {/* Stock */}
      <div className="mt-4 flex justify-between items-center">
        <span className="text-zinc-400">Available Stock</span>

        <span
          className={`font-bold ${
            vehicle.quantity > 0 ? "text-green-400" : "text-red-400"
          }`}
        >
          {vehicle.quantity}
        </span>
      </div>

      {/* Purchase Button Only For Users */}
      {!isAdmin && (
        <button
          disabled={vehicle.quantity === 0}
          onClick={() => handlePurchase(vehicle._id)}
          className={`mt-6 w-full py-3 rounded-xl font-semibold transition ${
            vehicle.quantity === 0
              ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
              : "bg-amber-500 hover:bg-amber-400 text-black"
          }`}
        >
          {vehicle.quantity === 0 ? "Out Of Stock" : "Purchase Vehicle"}
        </button>
      )}

      {/* Admin Message */}
      {isAdmin && (
        <div className="mt-6 text-center text-zinc-400 text-sm">
          Inventory management actions are available in the Admin Panel.
        </div>
      )}
    </div>
  );
}

export default VehicleCard;
