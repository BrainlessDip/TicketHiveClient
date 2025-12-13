import React from "react";
import { Link } from "react-router";

const Hero = () => {
  return (
    <div
      className="relative mt-4 mx-3 overflow-hidden rounded-3xl"
      style={{
        backgroundImage: "url(https://i.ibb.co/93WGgZpC/bus1.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative flex min-h-[420px] items-center justify-center px-6 py-16 text-neutral-content">
        <div className="max-w-xl rounded-3xl bg-black/40 backdrop-blur-md p-8 md:p-10 shadow-xl">
          <h1 className="mb-4 text-2xl md:text-5xl font-extrabold text-center">
            Travel Smarter. <br />
            Book Instantly.
          </h1>

          <p className="mb-6 text-base md:text-lg opacity-90">
            Book bus and flight tickets in seconds. All in one secure platform.
          </p>

          <div className="flex justify-center">
            <Link
              to="/all-tickets"
              className="btn btn-primary rounded-full px-8"
            >
              View All Tickets
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
