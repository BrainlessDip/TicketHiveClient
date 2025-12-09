import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import BookedTicketsCard from "../components/ui/BookedTicketsCard";

const BookedTickets = () => {
  const { user } = useContext(AuthContext);
  const api = useAxiosSecure();

  const { data: tickets = [], refetch } = useQuery({
    queryKey: ["user-booked-tickets", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await api.get(`/my-booked-tickets`);
      return res.data;
    },
  });

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {tickets.map((ticket, index) => (
        <BookedTicketsCard key={index} ticket={ticket} refetch={refetch} />
      ))}
    </div>
  );
};

export default BookedTickets;
