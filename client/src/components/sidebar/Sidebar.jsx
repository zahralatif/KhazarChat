import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { FiEdit3, FiMoreHorizontal, FiTrash2 } from "react-icons/fi";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { isFetching, isError, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/userChats`,
        {
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json();
    },
  });

  const [dropdownOpen, setDropdownOpen] = useState(null);
  const dropdownRef = useRef(null);

  const handleDotsClick = (chatId) => {
    setDropdownOpen(dropdownOpen === chatId ? null : chatId);
  };

  const handleDropdownItemClick = () => {
    setDropdownOpen(null);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const sortedChats = data
    ? [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  const location = useLocation();
  const currentChatId = location.pathname.split("/").pop();

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
                  Sizin hal-hazırda heç bir söhbətiniz yoxdur. <br /> Zəhmət
                  olmasa, sualınızı verin və yeni söhbət səhifənizə
                  yönləndiriləcəksiniz.
                </div>
              ) : (
                sortedChats.map((chat) => (
                  <Link
                    to={`/dashboard/chats/${chat._id}`}
                    key={chat._id}
                    className={`chat-item ${
                      chat._id === currentChatId ? "active" : ""
                    }`}
                  >
                    <div className="chat_title">
                      <div>{chat.title || "Yeni söhbət"}</div>
                      <div
                        className="dots"
                        onClick={() => handleDotsClick(chat._id)}
                      >
                        <FiMoreHorizontal />

                        {dropdownOpen === chat._id && (
                          <div className="dropdown_menu" ref={dropdownRef}>
                            <div
                              className="dropdown_item"
                              onClick={handleDropdownItemClick}
                            >
                              <FiEdit3 className="icon" />
                              Adını dəyiş
                            </div>
                            {/* <div
                              className="dropdown_item"
                              onClick={handleDropdownItemClick}
                            >
                              <FiShare className="icon" />
                              Paylaş
                            </div> */}
                            <div
                              className="dropdown_item delete"
                              onClick={handleDropdownItemClick}
                            >
                              <FiTrash2 className="icon" />
                              Sil
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
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
