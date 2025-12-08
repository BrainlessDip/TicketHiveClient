import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import Loading from "../components/ui/Loading";
import useRole from "../hooks/useRole";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, isLoading } = useRole();

  if ((loading, isLoading)) {
    return <Loading />;
  }

  if (user && role === "admin") {
    return children;
  }
  return <Navigate to="/" />;
};

export default AdminRoute;
