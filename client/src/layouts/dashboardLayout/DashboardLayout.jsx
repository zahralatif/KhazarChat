import { Outlet, useNavigate } from "react-router-dom";
import "./dashboardLayout.css";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import Sidebar from "../../components/sidebar/Sidebar";

const DashboardLayout = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  // State to manage sidebar open/closed status
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    console.log("Sidebar state:", !isOpen); // Debugging log
  };

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  }, [isLoaded, userId, navigate]);

  if (!isLoaded) {
    return (
      <div className="center">
        <PuffLoader color="#9394A5" />
      </div>
    );
  }

  console.log("isOpen state:", isOpen); // Debugging log

  return (
    <div className={`dashboardLayout ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className="sidebarMenu">
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
