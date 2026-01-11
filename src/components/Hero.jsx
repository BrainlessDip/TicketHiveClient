import React, { useState, useEffect } from "react";
import { Link } from "react-router";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Travel Smarter. Book Instantly.",
      description: "Book bus and flight tickets in seconds. All in one secure platform.",
      image: "https://i.ibb.co/93WGgZpC/bus1.jpg",
      cta: "View All Tickets",
      link: "/all-tickets",
    },
    {
      id: 2,
      title: "Explore New Destinations.",
      description: "Seamless travel booking for your next adventure.",
      image: "https://i.ibb.co/7dWx1DvW/plane3.webp",
      cta: "Explore Now",
      link: "/all-tickets",
    },
    {
      id: 3,
      title: "Reliable & Secure Booking.",
      description: "Your trust is our priority. Experience hassle-free ticketing.",
      image: "https://i.ibb.co/8LzgMqjQ/launch1.webp",
      cta: "Start Booking",
      link: "/all-tickets",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative mt-4 mx-3 overflow-hidden rounded-3xl h-[60vh] md:h-[70vh] group">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

          <div className="relative h-full flex items-center justify-center px-6 text-neutral-content">
            <div
              className={`max-w-xl rounded-3xl bg-black/30 backdrop-blur-md p-8 md:p-10 shadow-2xl border border-white/10 transition-all duration-700 transform ${
                index === currentSlide
                  ? "translate-y-0 opacity-100 scale-100"
                  : "translate-y-10 opacity-0 scale-95"
              }`}
            >
              <h1 className="mb-4 text-3xl md:text-5xl font-extrabold text-center leading-tight">
                {slide.title.split(". ").map((part, i) => (
                  <React.Fragment key={i}>
                    {part}
                    {i === 0 && <br />}
                  </React.Fragment>
                ))}
              </h1>

              <p className="mb-8 text-base md:text-lg text-center opacity-90 font-medium">
                {slide.description}
              </p>

              <div className="flex justify-center">
                <Link
                  to={slide.link}
                  className="btn btn-primary rounded-full px-10 hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-primary/50"
                >
                  {slide.cta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? "w-8 bg-primary" : "w-2 bg-white/50 hover:bg-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
