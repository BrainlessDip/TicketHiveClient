import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Loading from "./../components/ui/Loading";

const ManageTickets = () => {
  const { user } = useContext(AuthContext);
  const api = useAxiosSecure();

  const {
    data: tickets = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["all-tickets", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await api.get(`/manage-tickets`);
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
        await api.patch(`/manage-tickets/${id}`, { action });
        refetch();
        toast.success(`Ticket ${action}ed successfully!`);
      } catch (error) {
        toast.error("Something went wrong!");
        console.error(error);
      }
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-center mt-5 underline">
        Manage Tickets
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

              <th>Departure</th>
              <th>Perks</th>
              <th>Status</th>
              <th>Hide For Fraud</th>
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
                <td>{new Date(ticket.departure).toLocaleString()}</td>
                <td>{ticket.perks.join(", ") || "None"}</td>
                <td className="capitalize">{ticket.verificationStatus}</td>
                <td className="capitalize">{String(ticket.hideForFraud)}</td>
                <td className="capitalize">
                  <div className="flex justify-start items-start gap-3">
                    <button
                      className="btn btn-outline btn-primary btn-sm"
                      onClick={() => {
                        handleToggle(ticket._id, "approved");
                      }}
                    >
                      Approve
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

export default ManageTickets;
