import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import {
  FiChevronsLeft,
  FiEdit3,
  FiMenu,
  FiMoreHorizontal,
  FiTrash2,
} from "react-icons/fi";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const queryClient = useQueryClient();

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
  const [newTitle, setNewTitle] = useState("");
  const dropdownRef = useRef(null);

  const renameMutation = useMutation({
    mutationFn: async ({ chatId, title }) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/chats/${chatId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to rename chat");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["userChats"]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (chatId) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/chats/${chatId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete chat");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["userChats"]);
    },
  });

  const handleDotsClick = (chatId) => {
    setDropdownOpen(dropdownOpen === chatId ? null : chatId);
  };

  const handleRenameClick = (chatId) => {
    const title = prompt("Enter new chat title:");
    if (title) {
      renameMutation.mutate({ chatId, title });
    }
  };

  const handleDeleteClick = (chatId) => {
    if (window.confirm("Are you sure you want to delete this chat?")) {
      deleteMutation.mutate(chatId);
    }
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
          <FiMenu className="toggle-icon" />
        </div>
      )}

      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="sidebar-toggle" onClick={toggleSidebar}>
          {isOpen ? (
            <FiChevronsLeft className="toggle-icon" />
          ) : (
            <FiMenu className="toggle-icon" />
          )}
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
                              onClick={() => handleRenameClick(chat._id)}
                            >
                              <FiEdit3 className="icon" />
                              Adını dəyiş
                            </div>
                            <div
                              className="dropdown_item delete"
                              onClick={() => handleDeleteClick(chat._id)}
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
