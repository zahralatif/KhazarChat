import { Link } from "react-router-dom";
import "./newPrompt.css";
import { useEffect, useRef, useState } from "react";
import model from "../../lib/gemini";
import Markdown from "react-markdown";

const NewPrompt = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hello" }],
      },
      {
        role: "model",
        parts: [{ text: "Hello" }],
      },
    ]
    // ,
    // generationConfig: {
    //   // maxOutputTokens: 100,
    // },
  });

  const endRef = new useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [question, answer]);

  const add = async (text) => {
    setQuestion(text);

    const result = await chat.sendMessageStream(text);
    let accumulatedText = "";
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      accumulatedText += chunkText;
      setAnswer(accumulatedText);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = e.target.text.value;
    if (!text) return;

    add(text);
  };

  return (
    <div className="newPrompt">
      {question && <div className="message user">{question}</div>}
      {answer && (
        <div className="message">
          <div className="logo">
            <img src="/khazar_robot.png" alt="" />
          </div>
          <Markdown className="answer">{answer}</Markdown>
        </div>
      )}
      <div className="endChat" ref={endRef}></div>
      <form className="newForm" onSubmit={handleSubmit}>
        <input
          type="text"
          name="text"
          placeholder="Buyurun, sualınızı verin!"
        />
        <button>
          <img src="/send.png" alt="send-button" />
        </button>
      </form>
      <span>
        <Link to="/">KhazarBot</Link> səhv edə bilər. Vacib məlumatların
        doğruluğunu yoxlayın.
      </span>
    </div>
  );
};

export default NewPrompt;
