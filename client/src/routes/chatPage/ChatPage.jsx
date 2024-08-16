import "./chatPage.css";
import NewPrompt from "../../components/newPrompt/NewPrompt.jsx";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import Markdown from "react-markdown";

const ChatPage = () => {
  const path = useLocation().pathname;
  const chatId = path.split("/").pop();

  const { isFetching, isError, error, data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/chats/${chatId}`,
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
    <div className="chatPage">
      <div className="wrapper">
        <div className="chat">
          {isFetching ? (
            <BeatLoader color="#9394A5" className="center" />
          ) : isError ? (
            <div className="center">
              Something went wrong! <br /> {error.message}
            </div>
          ) : (
            data?.history?.map((message, i) => (
              <div
                className={message.role === "user" ? "message user" : "message"}
                key={`${message.role}-${i}`}
              >
                <div className="logo">
                  <img src="/khazar_robot.png" alt="robot" />
                </div>
                <Markdown className="answer">{message.parts[0].text}</Markdown>
              </div>
            ))
          )}
          {data && <NewPrompt data={data} />}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
