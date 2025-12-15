import React, { useState } from "react";
import useAxiosSecure from "./../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import Countdown from "../components/ui/Countdown";
import { useRef } from "react";
import Loading from "../components/ui/Loading";

const TicketDetails = () => {
  const api = useAxiosSecure();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const bookNowModal = useRef();

  const { data: ticket = {}, isLoading } = useQuery({
    queryKey: ["ticket-details", id],
    queryFn: async () => {
      const res = await api.get(`/my-tickets/${id}`);
      return res.data;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/submit-booking", {
        ticketId: id,
        quantity: Number(quantity),
      });
      toast.success(res.data.message);
      setQuantity(1);
      bookNowModal.current.close();
    } catch (err) {
      const msg = err?.response?.data?.message || "Try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 min-h-screen">
      <div className="rounded-xl shadow-lg border border-gray-200 bg-primary/10">
        <img
          src={ticket.imageUrl}
          alt={ticket.title}
          className="w-full h-60 object-cover rounded-t-xl"
        />

        <div className="p-4 space-y-2">
          <h2 className="text-2xl font-bold">{ticket.title}</h2>

          <p className="text-sm dark:text-yellow-400 text-black">
            Posted by: {ticket.name} ({ticket.email})
          </p>

          <div className="text-lg font-semibold mt-3">
            {ticket.from} to {ticket.to}
          </div>

          <p>
            Transport:{" "}
            <span className="font-medium">{ticket.transportType}</span>
          </p>

          <p>
            Price per unit:{" "}
            <span className="font-medium">${ticket.pricePerUnit}</span>
          </p>

          <p>
            Quantity: <span className="font-medium">{ticket.quantity}</span>
          </p>

          <p>
            Departure:{" "}
            <span className="font-medium">
              {new Date(ticket.departure).toLocaleString()}{" "}
              <Countdown departure={ticket.departure} />
            </span>
          </p>

          <p>
            Perks:{" "}
            {ticket.perks && ticket.perks.length > 0 ? (
              <span className="font-medium">{ticket.perks.join(", ")}</span>
            ) : (
              "None"
            )}
          </p>
          <button
            onClick={() => {
              bookNowModal.current.showModal();
            }}
            disabled={
              loading ||
              ticket.quantity === 0 ||
              new Date() >= new Date(ticket.departure)
            }
            className={`w-full mt-4 py-3 rounded-full font-bold
    ${
      ticket.quantity === 0 || new Date() >= new Date(ticket.departure)
        ? "bg-gray-400 text-gray-200 cursor-not-allowed"
        : "bg-primary text-white hover:bg-primary/90 cursor-pointer"
    }`}
          >
            {`Book Now (${ticket.quantity} left)`}
          </button>
        </div>
      </div>

      <dialog ref={bookNowModal} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Quantity</h3>
          <div className="p-8 max-w-md mx-auto">
            <div className="space-y-4">
              <label className="block">
                <span className="text-lg font-medium  mb-2 block">
                  How many tickets do you want to order?
                </span>
                <input
                  type="number"
                  name="quantity"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.min(e.target.value, ticket.quantity))
                  }
                  min={1}
                  max={ticket.quantity}
                  placeholder="Enter quantity"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </label>

              <button
                onClick={handleSubmit}
                className="w-full bg-primary cursor-pointer hover:bg-primary/80 text-white dark:text-white font-medium py-3 rounded-lg"
              >
                {loading ? "Processing..." : "Submit"}
              </button>
            </div>
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-primary">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default TicketDetails;
