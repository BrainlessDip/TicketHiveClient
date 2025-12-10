import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const RequestedBookings = () => {
  const { user } = useContext(AuthContext);
  const api = useAxiosSecure();

  const { data: tickets = [], refetch } = useQuery({
    queryKey: ["all-tickets-req", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await api.get(`/requested-bookings`);
      return res.data;
    },
  });

  const handleToggle = async (id, action) => {
    const result = await Swal.fire({
      title: `Are you sure you want to ${action.replace(
        "ed",
        ""
      )} this booking?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (result.isConfirmed) {
      try {
        await api.patch(`/requested-bookings/${id}`, { action });
        refetch();
        toast.success(`Booking ${action}ed successfully!`);
      } catch (error) {
        toast.error("Something went wrong!");
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Booked By</th>
              <th>Route</th>
              <th>Transport</th>
              <th>Total Value</th>
              <th>Departure</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={ticket._id || index}>
                <th>{index + 1}</th>
                <td className="font-bold">{ticket.title}</td>
                <td>{ticket.name || ticket.email}</td>
                <td>
                  {ticket.from} → {ticket.to}
                </td>
                <td>{ticket.transportType}</td>
                <td>
                  {ticket.pricePerUnit} × {ticket.quantity} ={" "}
                  {ticket.pricePerUnit * ticket.quantity}
                </td>
                <td>{new Date(ticket.departure).toLocaleString()}</td>

                <td className="capitalize">{ticket.status}</td>
                <td className="capitalize">
                  <div className="flex justify-start items-start gap-3">
                    <button
                      className="btn btn-outline btn-primary btn-sm"
                      onClick={() => {
                        handleToggle(ticket._id, "accepted");
                      }}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => {
                        handleToggle(ticket._id, "rejected");
                      }}
                      className="btn btn-outline btn-error btn-sm hover:text-white"
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RequestedBookings;
