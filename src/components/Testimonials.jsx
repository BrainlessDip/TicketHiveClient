import React from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "Adventure Seeker",
    feedback:
      "TicketHive made my cross-country bus trip so easy. The booking was instant, and the interface is super smooth!",
    rating: 5,
    image: "https://i.pravatar.cc/300",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Business Traveler",
    feedback:
      "I love the flight booking feature. It's reliable, secure, and always gives me the best routes at the lowest prices.",
    rating: 5,
    image: "https://i.pravatar.cc/302",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Frequent Voyager",
    feedback:
      "The best ticketing platform I've used. The support team is also very responsive whenever I have questions.",
    rating: 4,
    image: "https://i.pravatar.cc/301",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-center mt-5 underline">
            What Our Travelers Say
          </h1>
          <p className="text-lg opacity-70 max-w-2xl mx-auto">
            Discover why thousands of travelers trust TicketHive for their
            journeys every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={t.id}
              className="group bg-base-100/40 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/30 group-hover:border-primary transition-colors duration-300">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-primary text-white p-1.5 rounded-full shadow-lg">
                    <FaQuoteLeft size={10} />
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-bold">{t.name}</h4>
                  <p className="text-sm opacity-60">{t.role}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < t.rating ? "text-warning" : "text-base-300"}
                    size={16}
                  />
                ))}
              </div>

              <p className="text-base leading-relaxed opacity-80 italic">
                "{t.feedback}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
