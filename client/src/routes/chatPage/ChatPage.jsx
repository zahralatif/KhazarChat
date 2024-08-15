import { useRef, useEffect } from "react";
import "./chatPage.css";
import NewPrompt from "../../components/newPrompt/NewPrompt.jsx";

const ChatPage = () => {
  const endRef = new useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="chatPage">
      <div className="wrapper">
        <div className="chat">
          <div className="message user">
            Test message from user Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quasi deserunt placeat quod ex repellendus
            possimus recusandae doloribus delectus nostrum sint?
          </div>
          <div className="message">
            <div className="logo">
              <img src="/khazar_robot.png" alt="" />
            </div>
            Test message from KhazarBot Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Animi quam maiores vel facere atque maxime ipsum?
            Cupiditate quos rem deserunt, numquam dignissimos dolorem nisi
            recusandae! Iure, quisquam quae voluptas incidunt reprehenderit
            dolor repudiandae sed accusantium aliquam et laboriosam mollitia
            assumenda veniam ducimus delectus cumque quaerat. Quia excepturi
            necessitatibus quisquam expedita.
          </div>
          <div className="message user">Test message from user</div>
          <div className="message">Test message from KhazarBot</div>
          <div className="message user">Test message from user</div>
          <div className="message">Test message from KhazarBot</div>
          <div className="message user">Test message from user</div>
          <div className="message">Test message from KhazarBot</div>
          <div className="message user">Test message from user</div>
          <div className="message">Test message from KhazarBot</div>
          <div className="message user">Test message from user</div>
          <div className="message">Test message from KhazarBot</div>
          <div className="message user">Test message from user</div>
          <div className="message">Test message from KhazarBot</div>
          <div className="message user">Test message from user</div>
          <div className="message">Test message from KhazarBot</div>
          <div className="message user">Test message from user</div>
          <div className="message">Test message from KhazarBot</div>
          <div className="message user">Test message from user</div>
          <div className="message">Test message from KhazarBot</div>
          <div className="message user">Test message from user</div>
          <div className="message">
            Test message from KhazarBot last message
          </div>
          <NewPrompt />
          <div ref={endRef} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
