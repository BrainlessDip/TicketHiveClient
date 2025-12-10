import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const { user } = useContext(AuthContext);
  const api = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["all-users", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await api.get(`/manage-users`);
      return res.data;
    },
  });

  const handleToggle = async (id, action) => {
    const result = await Swal.fire({
      title: `Are you sure you want make ${action} this user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (result.isConfirmed) {
      try {
        await api.patch(`/manage-users/${id}`, { action });
        refetch();
        toast.success(`User role chanaged successfully!`);
      } catch (error) {
        toast.error("Something went wrong!");
        console.error(error);
      }
    }
  };

  return (
    <>
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-center mt-5 underline">
        Manage Users
      </h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id || index}>
                <th>{index + 1}</th>

                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="capitalize">{user.role}</td>
                <td className="capitalize">
                  <div className="flex justify-center items-center gap-3">
                    <button
                      className="btn btn-outline btn-primary btn-sm"
                      onClick={() => {
                        handleToggle(user._id, "admin");
                      }}
                    >
                      Make Admin
                    </button>
                    <button
                      className="btn btn-outline btn-primary btn-sm"
                      onClick={() => {
                        handleToggle(user._id, "vendor");
                      }}
                    >
                      Make Vendor
                    </button>
                    {user.role === "vendor" && (
                      <button
                        onClick={() => {
                          handleToggle(user._id, "fraud");
                        }}
                        className="btn btn-outline btn-error btn-sm hover:text-white"
                      >
                        Mark as Fraud
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageUsers;
