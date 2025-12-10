import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import TicketCardX from "../components/ui/TicketCardX";
import useAxios from "../hooks/useAxios";

const AllTickets = () => {
  const api = useAxios();

  const { data: tickets = [] } = useQuery({
    queryKey: ["all-tickets"],
    queryFn: async () => {
      const res = await api.get(`/all-tickets`);
      return res.data;
    },
  });

  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [transportType, setTransportType] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const filteredTickets = tickets
    .filter((ticket) => {
      const matchesFrom = fromLocation
        ? ticket.from.toLowerCase().includes(fromLocation.toLowerCase())
        : true;
      const matchesTo = toLocation
        ? ticket.to.toLowerCase().includes(toLocation.toLowerCase())
        : true;
      const matchesTransport = transportType
        ? ticket.transportType.toLowerCase() === transportType.toLowerCase()
        : true;
      return matchesFrom && matchesTo && matchesTransport;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") return a.pricePerUnit - b.pricePerUnit;
      if (sortOrder === "desc") return b.pricePerUnit - a.pricePerUnit;
      return 0;
    });

  return (
    <div className="px-4">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-center mt-5 underline">
        All Tickets
      </h1>

      <datalist id="locations">
        <option value="Dhaka" />
        <option value="Chittagong" />
        <option value="Sylhet" />
        <option value="Rajshahi" />
        <option value="Khulna" />
      </datalist>

      <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center">
        <input
          list="locations"
          type="text"
          placeholder="From Location"
          value={fromLocation}
          onChange={(e) => setFromLocation(e.target.value)}
          className="border rounded px-3 py-2 w-full sm:w-1/4"
        />
        <input
          type="text"
          list="locations"
          placeholder="To Location"
          value={toLocation}
          onChange={(e) => setToLocation(e.target.value)}
          className="border rounded px-3 py-2 w-full sm:w-1/4"
        />

        <select
          name="transportType"
          onChange={(e) => setTransportType(e.target.value)}
          value={transportType}
          className="select select-bordered focus:outline-none focus:ring focus:ring-primary/40"
          required
        >
          <option disabled selected>
            Select Transport Type
          </option>
          <option>Bus</option>
          <option>Train</option>
          <option>Launch</option>
          <option>Plane</option>
        </select>

        <select
          name="sortOrder"
          onChange={(e) => setSortOrder(e.target.value)}
          value={sortOrder}
          className="select select-bordered focus:outline-none focus:ring focus:ring-primary/40"
          required
        >
          <option disabled selected>
            Sort by Price
          </option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredTickets.map((ticket, index) => (
          <TicketCardX key={index} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default AllTickets;
