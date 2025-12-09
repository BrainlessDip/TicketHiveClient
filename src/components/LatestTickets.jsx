import React from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import TicketCardX from "./ui/TicketCardX";

const LatestTickets = () => {
  const api = useAxiosSecure();

  const { data: tickets = [] } = useQuery({
    queryKey: ["all-lastest-tickets"],
    queryFn: async () => {
      const res = await api.get(`/recent-tickets`);
      return res.data;
    },
  });
  return (
    <div>
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-center mt-5 underline">
        Latest Tickets
      </h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {tickets.map((ticket, index) => (
          <TicketCardX key={index} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default LatestTickets;
