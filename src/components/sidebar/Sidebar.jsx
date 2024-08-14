import { useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

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
              <Link to="/dashboard">KhazarChat: Create a new Chat</Link>
            </div>

            <hr />

            <span className="title">RECENT CHATS</span>
            <div className="chat_list">
              <Link to="/">Chat title</Link>
              <Link to="/">Chat title</Link>
              <Link to="/">Chat title</Link>
              <Link to="/">Chat title</Link>
              <Link to="/">Chat title</Link>
              <Link to="/">Chat title</Link>
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
