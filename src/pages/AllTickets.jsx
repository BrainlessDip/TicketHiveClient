import { useQuery } from "@tanstack/react-query";
import TicketCardX from "../components/ui/TicketCardX";
import useAxios from "../hooks/useAxios";

const AllTickets = () => {
  const api = useAxios();

  const { data: tickets = [] } = useQuery({
    queryKey: ["alltickets"],
    queryFn: async () => {
      const res = await api.get(`/all-tickets`);
      return res.data;
    },
  });

  return (
    <div>
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-center mt-5 underline">
        All Tickets
      </h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {tickets.map((ticket, index) => (
          <TicketCardX key={index} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default AllTickets;
