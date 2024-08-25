import { Link, useNavigate } from "react-router-dom";
import "./dashboardPage.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FiSend } from "react-icons/fi";

const DashboardPage = ({ isSidebarOpen }) => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (text) => {
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      }).then((res) => res.json());
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ["userChats"] });
      navigate(`/dashboard/chats/${id}`);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;

    mutation.mutate(text);
  };

  return (
    <div
      className={`dashboardPage ${
        isSidebarOpen ? "sidebar-open" : "sidebar-closed"
      }`}
    >
      <div className="mainContent">
        <div className="logo">
          <img src="/khu_logo.png" alt="logo" />
        </div>
        <div className="warning_message">
          <h3>
            Diqqət: Bu söhbət botu Xəzər Universiteti tələbələri tərəfindən
            hazırlanan tədqiqat məhsuludur və hazırda inkişaf etdirilir. Zəhmət
            olmasa, aldığınız vacib məlumatların doğruluğunu yoxlayın.
          </h3>
        </div>
      </div>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="text"
            placeholder="Buyurun, sualınızı verin!"
          />
          <button>
            <FiSend />
          </button>
        </form>
        <span>
          <Link to="/">KhazarBot</Link> səhv edə bilər. Vacib məlumatların
          doğruluğunu yoxlayın.
        </span>
      </div>
    </div>
  );
};

export default DashboardPage;
