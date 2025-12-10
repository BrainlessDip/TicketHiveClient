import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-base-200 text-center px-4">
      <h1 className="text-7xl font-extrabold text-primary mb-4 animate-pulse">
        404
      </h1>
      <h2 className="text-2xl font-semibold text-base-content mb-2">
        Page Not Found
      </h2>
      <p className="mb-6 max-w-md">
        The page you’re looking for doesn’t exist or might have been moved.
      </p>
      <Link
        to="/"
        className="btn btn-primary rounded-2xl shadow-md transition-transform duration-300 hover:scale-105"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
