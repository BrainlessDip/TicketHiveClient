import { useQuery } from "@tanstack/react-query";
import TicketCardX from "./ui/TicketCardX";
import useAxios from "../hooks/useAxios";
import { Link } from "react-router";

const dumpData = {
  _id: "......",
  email: "......",
  displayName: null,
  title: "......",
  from: "....",
  to: ".........",
  transportType: "......",
  pricePerUnit: 0,
  quantity: 0,
  departure: "2025-12-12T17:26:00.000Z",
  perks: ["AC"],
  imageUrl:
    "https://mir-s3-cdn-cf.behance.net/project_modules/fs/b6e0b072897469.5bf6e79950d23.gif",
  createdAt: "2025-12-11T17:27:08.106Z",
  verificationStatus: "approved",
  advertiseStatus: "hide",
  hideForFraud: false,
};

const LatestTickets = () => {
  const api = useAxios();

  const { data: tickets = [], isLoading } = useQuery({
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
        {isLoading ? (
          <>
            <TicketCardX key={1} ticket={dumpData} />
            <TicketCardX key={2} ticket={dumpData} />
            <TicketCardX key={3} ticket={dumpData} />
            <TicketCardX key={4} ticket={dumpData} />
          </>
        ) : (
          <>
            {tickets.map((ticket, index) => (
              <TicketCardX key={index} ticket={ticket} />
            ))}
          </>
        )}
      </div>
      <div className="flex justify-center items-center mt-5">
        <Link
          to={"/all-tickets"}
          className="btn btn-dash btn-primary rounded-3xl text-[20px]"
        >
          Show All
        </Link>
      </div>
    </div>
  );
};

export default LatestTickets;
