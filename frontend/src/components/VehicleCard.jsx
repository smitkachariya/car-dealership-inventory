function VehicleCard({ vehicle }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold">
        {vehicle.make} {vehicle.model}
      </h2>

      <p className="text-gray-500">{vehicle.category}</p>

      <p className="text-xl font-semibold mt-3">
        ₹{vehicle.price.toLocaleString()}
      </p>

      <p className="mt-2">
        Stock: {vehicle.quantity}
      </p>

      <button
        disabled={vehicle.quantity === 0}
        className={`mt-4 w-full py-3 rounded text-white ${
          vehicle.quantity === 0
            ? "bg-gray-400"
            : "bg-blue-600"
        }`}
      >
        {vehicle.quantity === 0
          ? "Out Of Stock"
          : "Purchase"}
      </button>
    </div>
  );
}

export default VehicleCard;