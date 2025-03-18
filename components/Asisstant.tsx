"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Add welcome message when chat is opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content:
            "Hello! I am Jamal Mohafil's personal assistant. How can I help you today?",
        },
      ]);
    }
  }, [isOpen, messages.length]);

  // Suggested questions
  const suggestedQuestions = [
    "What are your programming skills?",
    "How can I contact you?",
    "What projects have you worked on?",
    "What is your specialization in programming?",
  ];

  // Send messages to API
  const sendMessage = async (userMessage: string = input) => {
    if (userMessage.trim() === "") return;

    const msgToSend = userMessage.trim();
    setInput("");

    // Add user message to the conversation
    setMessages((prev) => [...prev, { role: "user", content: msgToSend }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: msgToSend }),
      });

      if (!response.ok) {
        throw new Error("Failed to connect to server");
      }

      const data = await response.json();

      // Add assistant response to the conversation
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (error) {
      console.error("Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, an error occurred while processing your request. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const [showHoverText, setShowHoverText] = useState<boolean>(false);

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {/* Open/Close button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 flex items-center justify-center"
        aria-label={isOpen ? "Close Chat" : "Open Chat"}
        onMouseEnter={() => setShowHoverText(true)}
        onMouseLeave={() => setShowHoverText(false)}
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
        {showHoverText && (
          <div className="absolute top-1/2 translate-y-[-50%] left-[104%] w-max transform bg-gray-800 text-white text-sm rounded-lg px-3 py-1 shadow-lg">
            Jamal Mohafil AI Assistant
          </div>
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="absolute bottom-16 left-0 bg-white rounded-2xl shadow-2xl border border-gray-200 w-80 md:w-96 overflow-hidden flex flex-col transform transition-all duration-300 max-h-[80vh]">
          {/* Chat header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-4 flex justify-between items-center">
            <div>
              <h3 className="font-medium text-lg">Jamal Mohafil</h3>
              <p className="text-sm opacity-90">AI Assistant</p>
            </div>
            <div className="h-10 w-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
          </div>

          {/* Chat content */}
          <div
            className="flex-1 p-4 overflow-y-auto bg-gray-50"
            style={{ maxHeight: "50vh" }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 ${msg.role === "user" ? "text-right" : "text-left"}`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none shadow-md"
                      : "bg-white text-gray-800 rounded-bl-none shadow-md border border-gray-100"
                  }`}
                  style={{
                    maxWidth: "85%",
                    wordBreak: "break-word",
                  }}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: msg.content
                        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // **Bold**
                        .replace(/\n/g, "<br />") // New lines

                        // تحويل الروابط النصية إلى <a> بشكل صحيح
                        .replace(
                          /(\bhttps?:\/\/[^\s<]+)/g,
                          (url) =>
                            `<a href="${url}" class="text-blue-500 underline" target="_blank">${url}</a>`,
                        )

                        // تحويل Markdown `[نص](رابط)` بشكل صحيح
                        .replace(
                          /\[(.*?)\]\((https?:\/\/[^\s]+)\)/g,
                          (_, text, url) =>
                            `<a href="${url}" class="text-blue-500 underline" target="_blank">${text}</a>`,
                        )

                        // تحويل الإيميلات إلى mailto:
                        .replace(
                          /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/g,
                          (email) =>
                            `<a href="mailto:${email}" class="text-green-500 underline">${email}</a>`,
                        )

                        // تحويل أرقام الهواتف إلى tel:
                        .replace(
                          /\b\+?\d{1,3}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}\b/g,
                          (phone) =>
                            `<a href="tel:${phone}" class="text-red-500 underline">${phone}</a>`,
                        )

                        // تحسين تنسيق القوائم
                        .replace(/\* (.*?)<br \/>/g, "<ul><li>$1</li></ul>")
                        .replace(/<\/ul><ul>/g, ""), // منع التكرار الخاطئ للقوائم
                    }}
                  />
                </div>
                {msg.role === "user" ? (
                  <div className="text-xs text-gray-500 mt-1 mr-1">You</div>
                ) : (
                  <div className="text-xs text-gray-500 mt-1 ml-1">
                    Assistant
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="text-left mb-4">
                <div className="inline-block p-3 rounded-lg bg-white text-gray-800 rounded-bl-none shadow-md border border-gray-100">
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                    <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested questions */}
          {messages.length <= 2 && (
            <div className="p-3 bg-gray-50 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2 font-medium">
                Suggested Questions
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendMessage(question)}
                    className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors border border-blue-100"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input field */}
          <div className="border-t border-gray-200 p-3 bg-white">
            <div className="flex">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message"
                className="flex-1 border border-gray-300 rounded-l-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none max-h-24"
                rows={1}
              />
              <button
                onClick={() => sendMessage()}
                disabled={isLoading || input.trim() === ""}
                className="bg-gradient-to-r  from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 rounded-r-lg disabled:opacity-70 transition-all duration-300"
                aria-label="Submit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transform rotate-0"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
