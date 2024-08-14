import { Link } from "react-router-dom";
import "./homePage.css";
import { TypeAnimation } from "react-type-animation";
import { useState } from "react";

const HomePage = () => {
  const [typingStatus, setTypingStatus] = useState("Amil");

  return (
    <div className="homePage">
      <div className="left">
        <h1>Khazar Chat</h1>
        <h2>
          Diqqət: Bu söhbət botu Xəzər Universiteti tələbələri tərəfindən
          hazırlanan tədqiqat məhsuludur və hazırda inkişaf etdirilir. Zəhmət
          olmasa, aldığınız vacib məlumatların doğruluğunu yoxlayın.
        </h2>
        <Link to="/dashboard">İndi Başla</Link>
      </div>
      <div className="right">
        <div className="imgContainer">
          <div className="bgContainer">
            <div className="bg"></div>
          </div>
          <img src="/khazar_bot.png" alt="robot" className="bot" />
          <div className="chat">
            <img
              src={
                typingStatus === "Amil"
                  ? "/amil.jpeg"
                  : typingStatus === "Zahra"
                  ? "/zahra.png"
                  : "/khazar_robot.png"
              }
              alt="profile"
            />
            <TypeAnimation
              sequence={[
                "Amil: KhazarChat nə üçündür?",
                2000,
                () => {
                  setTypingStatus("KhazarBot");
                },
                "KhazarBot: KhazarChat universitetimizə yeni tədris ilində daxil olmaq istəyən tələbələri məlumatlandırmaq üçün, eyni zamanda tələbələrimizin müxtəlif suallarına cavab tapması üçün hazırlanan tədqiqat məhsuludur.",
                2000,
                () => {
                  setTypingStatus("Zahra");
                },
                "Zahra: KhazarChat kim tərəfindən yaradılıb?",
                2000,
                () => {
                  setTypingStatus("KhazarBot");
                },
                "KhazarBot: KhazarChat Xəzər Universiteti tələbələri, Zəhra Lətif və Amil Abbasov tərəfindən hazırlanmışdır və hazırda inkişaf etdirilir.",
                2000,
                () => {
                  setTypingStatus("Amil");
                },
              ]}
              wrapper="span"
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>
      <div className="copyright">
        <div className="links" translate="no">
          <span>© {new Date().getFullYear()}</span>
          <Link to='https://www.linkedin.com/in/zahra-latif/'>Zahra Latif</Link>
          <span>&</span>
          <Link to='https://www.linkedin.com/in/amil-abbasov-1b7585274/'>Amil Abbasov</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
