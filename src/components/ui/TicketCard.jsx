import React from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const TicketCard = ({ ticket, refetch }) => {
  const api = useAxiosSecure();

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/my-tickets/${id}`);
        refetch();
        toast.success("Ticket deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete the ticket.");
      }
    }
  };

  return (
    <div className="max-w-sm w-full bg-primary/10 rounded-lg shadow-md overflow-hidden border border-gray-200 hover:ring-offset-1">
      {ticket?.imageUrl && (
        <img
          src={ticket.imageUrl}
          alt={ticket?.title}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">{ticket.title}</h2>
          <span
            className={`text-sm font-medium capitalize ${
              ticket.verificationStatus === "pending"
                ? "text-yellow-500"
                : ticket.verificationStatus === "approved"
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {ticket.verificationStatus}
          </span>
        </div>

        <p className="mb-1">
          <strong>From:</strong> {ticket.from} <br />
          <strong>To:</strong> {ticket.to}
        </p>
        <p className="mb-1">
          <strong>Transport:</strong> {ticket.transportType}
        </p>
        <p className="mb-1">
          <strong>Departure:</strong>{" "}
          {new Date(ticket.departure).toLocaleString()}
        </p>

        <p className="mb-1">
          <strong>Price per Unit:</strong> ${ticket.pricePerUnit}
        </p>
        <p className="mb-2">
          <strong>Quantity:</strong> {ticket.quantity}
        </p>

        {ticket.perks && ticket.perks.length > 0 && (
          <div className="mt-2">
            <strong>Perks: </strong> {ticket.perks.join(", ")}
          </div>
        )}
        <div className="mt-3 flex justify-center items-center gap-5">
          <Link to={`/dashboard/edit-ticket/${ticket._id}`}>
            <button
              className="btn btn-outline btn-primary btn-sm"
              disabled={ticket.verificationStatus === "rejected"}
            >
              Update
            </button>
          </Link>
          <button
            onClick={() => {
              handleDelete(ticket._id);
            }}
            className="btn btn-outline btn-error btn-sm hover:text-white"
            disabled={ticket.verificationStatus === "rejected"}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
