import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const TransactionsHistory = () => {
  const { user } = useContext(AuthContext);
  const api = useAxiosSecure();

  const { data: transactions = [] } = useQuery({
    queryKey: ["transactions-history", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await api.get(`/transactions-history`);
      return res.data;
    },
  });

  return (
    <>
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-center mt-5 underline">
        Transactions History
      </h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={transaction._id || index}>
                <th>{index + 1}</th>
                <td className="font-bold">{transaction.title}</td>
                <td>{transaction.id}</td>
                <td>${transaction.amount_total}</td>
                <td>{new Date(transaction.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TransactionsHistory;
