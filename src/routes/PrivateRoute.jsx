import { Navigate } from "react-router";
import useAuth from "./../hooks/useAuth";
import Loading from "../components/ui/loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
