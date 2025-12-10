const PopularRoutes = () => {
  const popularRoutes = [
    { from: "Dhaka", to: "Chittagong" },
    { from: "Dhaka", to: "Sylhet" },
    { from: "Dhaka", to: "Rajshahi" },
    { from: "Dhaka", to: "Khulna" },
    { from: "Chittagong", to: "Dhaka" },
    { from: "Chittagong", to: "Khulna" },
    { from: "Sylhet", to: "Dhaka" },
    { from: "Khulna", to: "Rajshahi" },
  ];

  return (
    <section className="px-4 py-12 max-w-7xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-center mt-5 underline">
        Popular Routes
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {popularRoutes.map((route, index) => (
          <div
            key={index}
            className="p-6 border rounded-lg shadow hover:shadow-lg transition"
          >
            <p className="text-xl font-semibold">
              {route.from} → {route.to}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularRoutes;
