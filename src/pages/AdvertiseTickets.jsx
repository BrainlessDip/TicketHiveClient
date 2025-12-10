import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import TicketCard from "../components/ui/TicketCard";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const AdvertiseTickets = () => {
  const { user } = useContext(AuthContext);
  const api = useAxiosSecure();

  const { data: tickets = [], refetch } = useQuery({
    queryKey: ["all-advertise-tickets", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await api.get(`/advertise-tickets-admin`);
      return res.data;
    },
  });

  const handleToggle = async (id, action) => {
    const result = await Swal.fire({
      title: `Are you sure you want to ${action} this ticket?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (result.isConfirmed) {
      try {
        const res = await api.patch(`/advertise-tickets/${id}`, { action });
        refetch();
        if (res.data.success) {
          return toast.success(res.data.message);
        }
        {
          return toast.error(res.data.message);
        }
      } catch (error) {
        toast.error("Something went wrong!");
        console.error(error);
      }
    }
  };

  return (
    <>
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-center mt-5 underline">
        Advertise Tickets
      </h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Created By</th>
              <th>Route</th>
              <th>Transport</th>
              <th>Total Value</th>
              <th>Departure</th>
              <th>Perks</th>
              <th>Advertise Status</th>
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
                <td>{ticket.perks.join(", ") || "None"}</td>
                <td className="capitalize">{ticket.advertiseStatus}</td>
                <td className="capitalize">
                  <div className="flex justify-start items-start gap-3">
                    <button
                      className="btn btn-outline btn-primary btn-sm"
                      onClick={() => {
                        handleToggle(ticket._id, "show");
                      }}
                    >
                      Show
                    </button>
                    <button
                      onClick={() => {
                        handleToggle(ticket._id, "hide");
                      }}
                      className="btn btn-outline btn-error btn-sm hover:text-white"
                    >
                      Hide
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

export default AdvertiseTickets;
