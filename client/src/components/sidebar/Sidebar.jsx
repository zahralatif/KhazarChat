import { Link } from "react-router-dom";
import "./sidebar.css";
import { useQuery } from "@tanstack/react-query";
import { BeatLoader } from "react-spinners";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { isFetching, isError, error, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/userChats`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        return response.json();
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
  });

  return (
    <>
      {!isOpen && (
        <div className="burger-menu" onClick={toggleSidebar}>
          <img src="/burger.png" alt="open-menu" />
        </div>
      )}

      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="sidebar-toggle" onClick={toggleSidebar}>
          <img src={isOpen ? "/close.png" : "/burger.png"} alt="toggle-icon" />
        </div>

        {isOpen && (
          <>
            <div className="logo">
              <Link to="http://khazar.org">
                <img src="/khazar_logo-dark.png" alt="khazar-logo" />
                <span translate="no">
                  Hər gün, hər saat mükəmməlliyə doğru!
                </span>
              </Link>
            </div>

            <div className="chat_logo">
              <img src="/khazar_bot.png" alt="robot" />
              <Link to="/dashboard">KhazarBot: Yeni söhbət başladın</Link>
            </div>

            <hr />

            <span className="title">SON SÖHBƏTLƏR</span>
            <div className="chat_list">
              {isFetching ? (
                <BeatLoader color="#9394A5" className="center" />
              ) : isError ? (
                <div className="center">
                  Something went wrong! <br /> {error.message}
                </div>
              ) : (
                data?.map((chat) => (
                  <Link to={`/dashboard/chats/${chat._id}`} key={chat._id}>
                    {chat.title || "Yeni söhbət"}
                  </Link>
                ))
              )}
            </div>

            <hr />

            <div className="buttons">
              <Link to="http://khazar.org">
                Xəzər Universitetinin Rəsmi Vebsaytı
              </Link>
              <Link to="http://sims.khazar.org/">Xəzər SIMS</Link>
            </div>

            <hr />

            <div className="suggest">
              <Link to="/">Şikayət və təklifləriniz</Link>
            </div>

            <div className="copyright">
              <div className="links" translate="no">
                <span>Created by</span>
                <Link to="https://www.linkedin.com/in/zahra-latif/">
                  Zahra Latif
                </Link>
                <span>&</span>
                <Link to="https://www.linkedin.com/in/amil-abbasov-1b7585274/">
                  Amil Abbasov
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Sidebar;
