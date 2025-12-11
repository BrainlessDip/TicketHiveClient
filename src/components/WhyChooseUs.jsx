import React from "react";

const WhyChooseUs = () => {
  const reasons = [
    "Fast and reliable service",
    "Affordable pricing",
    "24/7 customer support",
    "Easy booking process",
  ];

  return (
    <section className="px-4 pb-12 max-w-7xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-center underline">
        Why Choose Us?
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {reasons.map((reason, index) => (
          <div
            key={index}
            className="p-6 bg-blue-50 rounded-lg text-center hover:bg-blue-100 transition text-black hover:scale-105 hover:text-shadow-accent"
          >
            <p className="font-semibold">{reason}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
