import { Link, useLocation } from "react-router-dom";
import "./newPrompt.css";
import { useEffect, useRef, useState } from "react";
import model from "../../lib/gemini";
import Markdown from "react-markdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const NewPrompt = ({ data }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const chat = model.startChat({
    history: data?.history?.map(({ role, parts }) => ({
      role,
      parts: [{ text: parts[0].text }],
    })) || [],
  });

  const endRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [question, answer]);

  const queryClient = useQueryClient();
  const path = useLocation().pathname;
  const chatId = path.split("/").pop();

  const mutation = useMutation({
    mutationFn: () => {
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question.length ? question : undefined,
          answer,
        }),
      }).then((res) => res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat", chatId] }).then(() => {
        formRef.current.reset();
        setQuestion("");
        setAnswer("");
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const add = async (text, isInitial) => {
    if (!isInitial) setQuestion(text);

    try {
      const result = await chat.sendMessageStream([text]);
      let accumulatedText = "";

      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        accumulatedText += chunkText;
        setAnswer(accumulatedText);
      }

      mutation.mutate();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;

    setIsLoading(true);

    try {
      await add(text, false);
    } catch (error) {
      console.error("Error during message send:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current && data?.history?.length === 1) {
      add(data.history[0].parts[0].text, true);
    }
    hasRun.current = true;
  }, [add, data]);

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
      <form className="newForm" onSubmit={handleSubmit} ref={formRef}>
        <input
          type="text"
          name="text"
          placeholder="Buyurun, sualınızı verin!"
          disabled={isLoading}
        />
        <button disabled={isLoading}>
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
