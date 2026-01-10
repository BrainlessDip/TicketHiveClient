const ImpactStats = () => {
  const stats = [
    { value: "50K+", label: "Happy Customers" },
    { value: "100+", label: "Routes Covered" },
    { value: "500+", label: "Daily Bookings" },
    { value: "4.8/5", label: "Customer Rating" },
  ];

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="card bg-base-100 shadow-xl border border-base-300 text-center"
          >
            <div className="card-body">
              <h3 className="text-3xl md:text-4xl font-bold text-primary">
                {stat.value}
              </h3>
              <p className="text-base-content/70">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImpactStats;
