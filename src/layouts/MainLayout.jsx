import { use } from "react";
import { Outlet } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import Loading from "../components/ui/Loading";
import Navbar from "../components/Navbar";
import Foooter from "../components/Foooter";

const MainLayout = () => {
  const { loading } = use(AuthContext);
  return (
    <div className="container mx-auto">
      {loading ? (
        <Loading></Loading>
      ) : (
        <>
          <Navbar></Navbar>
          <Outlet></Outlet>
          <Foooter></Foooter>
        </>
      )}
    </div>
  );
};

export default MainLayout;
