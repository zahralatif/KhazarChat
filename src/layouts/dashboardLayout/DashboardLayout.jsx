import { Outlet, useNavigate } from "react-router-dom";
import "./dashboardLayout.css";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { PuffLoader } from "react-spinners";

const DashboardLayout = () => {
  const { userID, isLoaded } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !userID) {
      navigate("/sign-in");
    }
  }, [isLoaded, userID, navigate]);

  if (!isLoaded) {
    return (
      <div className="center">
        <PuffLoader color="#9394A5" />
      </div>
    );
  }

  return (
    <div className="dashboardlayout">
      <div className="sidebar">sidebar</div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
