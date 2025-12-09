import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Countdown from "./Countdown";

const BookedTicketsCard = ({ ticket, refetch }) => {
  const api = useAxiosSecure();

  const handlePay = async (ticketId, bookingId) => {
    const result = await Swal.fire({
      title: "Proceed to Payment?",
      text: "You will be redirected to the secure checkout page.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, continue",
    });

    if (result.isConfirmed) {
      try {
        const res = await api.post("/create-checkout-session", {
          ticketId,
          bookingId,
        });
        window.location.href = res.data.url;
      } catch (error) {
        toast.error("Payment failed. Try again.");
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
              ticket.status === "pending"
                ? "text-yellow-500"
                : ticket.status === "accepted"
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {ticket.status}
          </span>
        </div>

        <p className="mb-1">
          <strong>From:</strong> {ticket.from} <br />
          <strong>To:</strong> {ticket.to}
        </p>
        <p className="mb-2">
          <strong>Booking Quantity:</strong> {ticket.quantity}
        </p>
        <p className="mb-1">
          <strong>Transport:</strong> {ticket.transportType}
        </p>
        <p className="mb-1">
          <strong>Departure:</strong>{" "}
          {new Date(ticket.departure).toLocaleString()}{" "}
          <Countdown departure={ticket.departure} />
        </p>

        <p className="mb-1">
          <strong>Price per Unit:</strong> ${ticket.pricePerUnit}
        </p>

        <p className="mb-2">
          <strong>Total Price:</strong> ${ticket.quantity * ticket.pricePerUnit}
        </p>

        {ticket.perks && ticket.perks.length > 0 && (
          <div className="mt-2">
            <strong>Perks: </strong> {ticket.perks.join(", ")}
          </div>
        )}
        {ticket.status === "accepted" && (
          <div className="mt-3 flex justify-center items-center gap-5">
            <button
              onClick={() => {
                handlePay(ticket.ticketId, ticket._id);
              }}
              className="btn btn-outline btn-primary btn-sm"
              disabled={new Date() >= new Date(ticket.departure)}
            >
              Pay
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookedTicketsCard;
