import { use } from "react";
import { Outlet } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import Loading from "../components/ui/Loading";
import DashboardNavbar from "../components/DashboardNavbar";

const DashboardLayout = () => {
  const { loading } = use(AuthContext);
  return (
    <DashboardNavbar>
      {loading ? <Loading></Loading> : <Outlet></Outlet>}
    </DashboardNavbar>
  );
};

export default DashboardLayout;
