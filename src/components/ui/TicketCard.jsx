import React from "react";

const TicketCard = ({ ticket }) => {
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
            <strong>Perks:</strong>
            <ul className="list-disc list-inside">
              {ticket.perks.map((perk, index) => (
                <li key={index}>{perk}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketCard;
