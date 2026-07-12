function Home() {
  const vehicles = [
    {
      id: 1,
      make: "Toyota",
      model: "Fortuner",
      category: "SUV",
      price: 4200000,
      quantity: 5,
    },
    {
      id: 2,
      make: "Honda",
      model: "City",
      category: "Sedan",
      price: 1500000,
      quantity: 0,
    },
  ];

  return (
    <div style={{ padding: "30px", background: "#f3f4f6", minHeight: "100vh" }}>
      <h1>🚗 AutoInventory Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            }}
          >
            <h2>
              {vehicle.make} {vehicle.model}
            </h2>

            <p>{vehicle.category}</p>

            <h3>₹{vehicle.price.toLocaleString()}</h3>

            <p>Stock: {vehicle.quantity}</p>

            <button
              disabled={vehicle.quantity === 0}
              style={{
                width: "100%",
                padding: "10px",
                background: vehicle.quantity === 0 ? "gray" : "#2563eb",
                color: "white",
                border: "none",
              }}
            >
              {vehicle.quantity === 0 ? "Out Of Stock" : "Purchase"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;