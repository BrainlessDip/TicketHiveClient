import React, { use } from "react";
import { Link } from "react-router";
import { RxAvatar } from "react-icons/rx";
import { IoTicketOutline } from "react-icons/io5";
import { LuTicketCheck } from "react-icons/lu";
import useRole from "../hooks/useRole";
import { AuthContext } from "./../contexts/AuthContext";
import { MdHistory } from "react-icons/md";
import { FaAdversal, FaPeopleGroup } from "react-icons/fa6";

export default function DashboardNavbar({ children }) {
  const { role } = useRole();
  const { theme } = use(AuthContext);
  const themeName = theme ? "dark" : "light";
  return (
    <div data-theme={themeName}>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar w-full bg-primary">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {/* Sidebar toggle icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-4"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
            <Link to="/" className="px-4  btn-hover-primary ">
              Ticket Hive
            </Link>
          </nav>
          {/* Page content here */}
          <div className="p-4">{children}</div>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
            <ul className="menu w-full grow">
              <li>
                <Link
                  to="/"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Homepage"
                >
                  {/* Home icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-4"
                  >
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  </svg>
                  <span className="is-drawer-close:hidden">Homepage</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard/profile"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="My Profile"
                >
                  <RxAvatar className="my-1.5 inline-block size-4" />
                  <span className="is-drawer-close:hidden">My Profile</span>
                </Link>
              </li>

              {role === "vendor" && (
                <>
                  <li>
                    <Link
                      to="/dashboard/add-ticket"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Add Ticket"
                    >
                      <IoTicketOutline className="my-1.5 inline-block size-4" />
                      <span className="is-drawer-close:hidden">Add Ticket</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/my-added-ticket"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="My Added Ticket"
                    >
                      <LuTicketCheck className="my-1.5 inline-block size-4" />
                      <span className="is-drawer-close:hidden">
                        My Added Ticket
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/requested-bookings"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Requested Bookings"
                    >
                      <LuTicketCheck className="my-1.5 inline-block size-4" />
                      <span className="is-drawer-close:hidden">
                        Requested Bookings
                      </span>
                    </Link>
                  </li>
                </>
              )}

              {role === "user" && (
                <>
                  <li>
                    <Link
                      to="/dashboard/booked-tickets"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="My Booked Tickets"
                    >
                      <IoTicketOutline className="my-1.5 inline-block size-4" />
                      <span className="is-drawer-close:hidden">
                        My Booked Tickets
                      </span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/dashboard/transactions-history"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Transactions History"
                    >
                      <MdHistory className="my-1.5 inline-block size-4" />
                      <span className="is-drawer-close:hidden">
                        Transactions History
                      </span>
                    </Link>
                  </li>
                </>
              )}

              {role === "admin" && (
                <>
                  <li>
                    <Link
                      to="/dashboard/manage-tickets"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Manage Tickets"
                    >
                      <IoTicketOutline className="my-1.5 inline-block size-4" />
                      <span className="is-drawer-close:hidden">
                        Manage Tickets
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/manage-users"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Manage Users"
                    >
                      <FaPeopleGroup className="my-1.5 inline-block size-4" />
                      <span className="is-drawer-close:hidden">
                        Manage Users
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/advertise-tickets"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Advertise Tickets"
                    >
                      <FaAdversal className="my-1.5 inline-block size-4" />
                      <span className="is-drawer-close:hidden">
                        Advertise Tickets
                      </span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
