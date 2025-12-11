import React from "react";
import { FaBus, FaFacebook, FaMailchimp, FaPhone } from "react-icons/fa6";
import { Link } from "react-router";

const Foooter = () => {
  return (
    <div className="bg-base-100 ">
      <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2">
              <FaBus className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              <span className="text-xl sm:text-2xl font-bold">TicketHive</span>
            </div>
            <p className="text-sm sm:text-base opacity-80 max-w-xs">
              Book bus, train, launch & flight tickets easily
            </p>
          </div>

          <div className="sm:col-span-1">
            <h3 className="footer-title text-sm sm:text-base font-semibold mb-3 sm:mb-4 opacity-90">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="link link-hover text-sm hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/tickets"
                  className="link link-hover text-sm hover:text-primary transition-colors"
                >
                  All Tickets
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="link link-hover text-sm hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="link link-hover text-sm hover:text-primary transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div className="sm:col-span-1">
            <h3 className="footer-title text-sm sm:text-base font-semibold mb-3 sm:mb-4 opacity-90">
              Contact Info
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <FaMailchimp className="w-4 h-4 text-primary shrink-0" />
                <a
                  href="mailto:info@tickethive.com"
                  className="link link-hover hover:text-primary transition-colors break-all"
                >
                  info@tickethive.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <FaPhone className="w-4 h-4 text-primary shrink-0" />
                <a
                  href="tel:+8801234567890"
                  className="link link-hover hover:text-primary transition-colors"
                >
                  +880 1234-6347830
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <FaFacebook className="w-4 h-4 text-primary shrink-0" />
                <a
                  href="https://facebook.com/tickethive"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-hover hover:text-primary transition-colors"
                >
                  Facebook Page
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Payment Methods</h3>
            <div className="flex items-center gap-3">
              <svg
                className="w-12 h-5"
                viewBox="0 0 60 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 12.5C0 5.596 5.596 0 12.5 0h35C54.404 0 60 5.596 60 12.5S54.404 25 47.5 25h-35C5.596 25 0 19.404 0 12.5z"
                  fill="#635BFF"
                />
                <text
                  x="30"
                  y="16"
                  fill="white"
                  fontSize="12"
                  fontWeight="bold"
                  textAnchor="middle"
                  fontFamily="Arial"
                >
                  Stripe
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-base-300">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-sm opacity-70">
            © 2025 TicketHive. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Foooter;
