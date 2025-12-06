import { use } from "react";
import { Outlet } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import Loading from "./../components/ui/loading";

const MainLayout = () => {
  const { loading } = use(AuthContext);
  return (
    <div className="max-w-7xl mx-auto">
      {loading ? (
        <Loading></Loading>
      ) : (
        <>
          <Outlet></Outlet>
        </>
      )}
    </div>
  );
};

export default MainLayout;
