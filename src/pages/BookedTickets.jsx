import React, { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import BookedTicketsCard from "../components/ui/BookedTicketsCard";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router";

const BookedTickets = () => {
  const { user } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const success = searchParams.get("type");
  const api = useAxiosSecure();

  const { data: tickets = [], refetch } = useQuery({
    queryKey: ["user-booked-tickets", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await api.get(`/my-booked-tickets`);
      return res.data;
    },
  });

  useEffect(() => {
    const handleStatus = async () => {
      window.history.replaceState({}, "", "/dashboard/booked-tickets");
      if (success === "success") {
        const res = await api.patch(
          `/payment-status?sessionId=${searchParams.get("sessionId")}`
        );
        if (res.data.success) {
          refetch();
          toast.success("Payment Successful!");
        }
      } else if (success === "cancel") {
        toast.error("Payment Cancelled");
      }
    };

    handleStatus();
  }, [success, searchParams, api, refetch]);

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {tickets.map((ticket, index) => (
        <BookedTicketsCard key={index} ticket={ticket} refetch={refetch} />
      ))}
    </div>
  );
};

export default BookedTickets;
