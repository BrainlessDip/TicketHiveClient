import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import Loading from "../components/ui/Loading";
import useRole from "../hooks/useRole";

const UserRounte = ({ children }) => {
  const { user, loading } = useAuth();
  const { role = "user" } = useRole();

  if (loading) {
    return <Loading />;
  }

  if (user && role === "user") {
    return children;
  }
  return <Navigate to="/" />;
};

export default UserRounte;
