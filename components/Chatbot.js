"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Chatbot({ articleBody = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  const pathname = usePathname();

  useEffect(() => {
    const resourceType = pathname?.split("/")[3];
    console.log("Type: " + resourceType);
    if (resourceType === "quiz" || resourceType === "video") {
      setIsHidden(true);
    } else if (resourceType === "flashcards" || resourceType === "article") {
      setIsHidden(false);
    }
  }, [pathname]);

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage = input;
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");

    const fullMessage = articleBody 
      ? `${userMessage}\n\nArticle content: ${articleBody}` 
      : userMessage;

    setIsTyping(true);
    const response = await fetch("/api/chatgpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: fullMessage }),
    });
    const data = await response.json();
    setIsTyping(false);
    setMessages((prev) => [...prev, { sender: "bot", text: data.response }]);
  };

  const handleToggleChat = () => {
    setIsOpen((prev) => {
      if (!prev && messages.length === 0) {
        setMessages([
          { sender: "bot", text: "Hello! How can I help you today?" },
        ]);
      }
      return !prev;
    });
  };

  return (
    !isHidden && (
      <div className="fixed bottom-6 right-10 z-10">
        <button
          onClick={handleToggleChat}
          className={`bg-[#0E793C] text-white p-4 rounded-full shadow-lg ${isOpen ? "hidden" : "visible"}`}
        >
          <Image
            src="/images/chat.png"
            width={30}
            height={30}
            alt="open chat icon"
          ></Image>
        </button>

        {isOpen && (
          <div
            className={`chat-widget pop-up-animation bg-[#FDFDFD] shadow-lg rounded-lg w-[300px] h-[500px] flex flex-col`}
          >
            <div className="bg-gradient-to-r from-[#0E793C] to-[#0E6D78] w-full h-10 rounded-t-lg flex flex-row justify-between items-center px-6">
              <Image
                src="/images/chat.png"
                width={16}
                height={16}
                alt="chat icon"
              ></Image>

              <Image
                src="/images/close.png"
                width={16}
                height={16}
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer"
                alt="close chat icon"
              ></Image>
            </div>
            <div className="flex-1 overflow-y-auto mb-4 p-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-2 mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}
                >
                  <div
                    className={`inline-block p-2 rounded-lg shadow-md ${msg.sender === "user" ? "bg-blue-200" : "bg-white"}`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="text-left">
                  <div className="inline-block p-2 rounded-lg bg-gray-200">
                    <span className="animate-pulse">Typing...</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-row justify-center items-center p-2 gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="border p-2 w-full rounded-lg"
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                className="bg-[#0E793C] text-white p-2 rounded-lg h-full"
              >
                <Image
                  src="/images/send-message.png"
                  width={16}
                  height={16}
                  alt="send"
                />
              </button>
            </div>
          </div>
        )}
      </div>
    )
  );
}
