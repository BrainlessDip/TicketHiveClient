import { useQuery } from "@tanstack/react-query";
import TicketCardX from "./ui/TicketCardX";
import useAxios from "../hooks/useAxios";

const ShowAdvertiseTickets = () => {
  const api = useAxios();

  const { data: tickets = [] } = useQuery({
    queryKey: ["all-ad-tickets"],
    queryFn: async () => {
      const res = await api.get(`/advertise-tickets`);
      return res.data;
    },
  });

  return (
    <div>
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-center mt-5 underline">
        Advertisement Tickets
      </h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {tickets.map((ticket, index) => (
          <TicketCardX key={index} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default ShowAdvertiseTickets;
