import { useContext } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../contexts/AuthContext";
import Loading from "../components/ui/Loading";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["user-data", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/profile`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex justify-center items-center flex-col min-h-[calc(100vh-95px)] px-4 py-10">
        <h2 className="text-4xl font-bold drop-shadow-xl mb-6">My Profile</h2>

        <div className="bg-base-100 border border-base-300 rounded-2xl w-full max-w-sm p-6 shadow-xl flex flex-col items-center gap-3">
          <img
            src={
              user?.photoURL ||
              "https://img.icons8.com/?size=100&id=fUUEbUbXhzOA&format=png&color=ffffff"
            }
            alt="Profile"
            className="w-28 h-28 rounded-2xl shadow-md object-cover"
          />

          <h1 className="text-xl font-bold">{user?.displayName}</h1>
          <p className="text-[15px] text-base-content/70">
            Email: {user?.email || "Not available"}
          </p>
          <p className="text-[15px] text-base-content/70 capitalize">
            Role: {data?.role || "Not available"}
          </p>
        </div>
      </div>
    </>
  );
};

export default Profile;
