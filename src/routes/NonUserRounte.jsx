import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import Loading from "../components/ui/Loading";

const NonUserRounte = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default NonUserRounte;
