import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, Send, X, Bot, User } from "lucide-react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState();
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([
    {
      text: "Hi! I'm NourishNet. How can I help with your nutrition today?",
      isBot: true,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchChatHistory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/ai/chats/previous",
        { withCredentials: true },
      );

      const result = await response.data;

      if (result.success) {
        setChats(result.data);
      } else {
        setError(result.message);
      }
    } catch {
      setError("Failed to load chat history.");
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { text: input, isBot: false };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    const currentInput = input;
    setInput("");

    try {
      const response = await axios.post(
        "http://localhost:3000/ai/ask_bot",
        { question: currentInput },
        { withCredentials: true },
      );

      // Axios stores the result in .data
      setMessages((prev) => [
        ...prev,
        { text: response.data.answer, isBot: true },
      ]);
    } catch (err) {
      console.error("Axios Error:", err);
      setMessages((prev) => [
        ...prev,
        { text: "Connection error. Is the backend running?", isBot: true },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 flex h-[400px] w-[200px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 sm:w-[400px]">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-green-600 to-emerald-500 p-4 text-white">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <span className="font-semibold tracking-wide">NourishNet AI</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:text-green-100 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto bg-gray-50 p-4 space-y-4"
          >
            {/* previous chats of the user  */}
            {chats && chats.length > 0 ? (
              chats.map((chat) => (
                <div key={chat._id} className="flex flex-col gap-4 mb-4">
                  {/* 1. USER QUESTION BLOCK */}
                  <div className="flex justify-end">
                    <div className="flex max-w-[80%] gap-2 flex-row-reverse">
                      {/* User Avatar */}
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white shadow-sm bg-green-500">
                        <User size={16} />
                      </div>
                      {/* User Bubble */}
                      {/* User Bubble - Fixed classes and background */}
                      <div className="rounded-2xl px-4 py-2 text-sm shadow-sm bg-green-500 text-white rounded-tr-none">
                        {chat.question}
                      </div>
                    </div>
                  </div>

                  {/* 2. BOT ANSWER BLOCK */}
                  <div className="flex justify-start">
                    <div className="flex max-w-[80%] gap-2 flex-row">
                      {/* Bot Avatar */}
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white shadow-sm bg-green-500">
                        <Bot size={16} />
                      </div>
                      {/* Bot Bubble */}
                      <div className="rounded-2xl px-4 py-2 text-sm shadow-sm bg-white text-gray-800 rounded-tl-none border border-gray-100 prose prose-sm prose-green max-w-none">
                        {/* Using ReactMarkdown in case the stored answer has formatting */}
                        <ReactMarkdown>{chat.answer}</ReactMarkdown>
                      </div>
                    </div>
                  </div>

                  {/* Timestamp */}
                  <div className="text-center text-[10px] text-gray-400 -mt-2">
                    {new Date(chat.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-400 text-sm">
                  No previous history available.
                </p>
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.isBot ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`flex max-w-[80%] gap-2 ${m.isBot ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white shadow-sm ${m.isBot ? "bg-green-500" : "bg-blue-500"}`}
                  >
                    {m.isBot ? <Bot size={16} /> : <User size={16} />}
                  </div>
                  <div
                    className={`rounded-2xl px-4 py-2 text-sm shadow-sm ${
                      m.isBot
                        ? "bg-white text-gray-800 rounded-tl-none prose prose-sm prose-green max-w-none"
                        : "bg-green-600 text-white rounded-tr-none"
                    }`}
                  >
                    {m.isBot ? <ReactMarkdown>{m.text}</ReactMarkdown> : m.text}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex gap-2 items-center text-gray-400 text-xs italic ml-10">
                  <div className="flex space-x-1">
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]"></div>
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]"></div>
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400"></div>
                  </div>
                  <span>NourishNet is thinking...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t bg-white p-4">
            <div className="flex items-center gap-2 rounded-xl bg-gray-100 px-3 py-2 focus-within:ring-2 focus-within:ring-green-500">
              <input
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about your nutrition..."
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="text-green-600 hover:text-green-700 disabled:text-gray-300 transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          fetchChatHistory();
        }}
        className={`flex h-11 w-12 items-center justify-center rounded-full text-white shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 ${
          isOpen ? "bg-red-500 rotate-90" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
      </button>
    </div>
  );
};

export default Chatbot;
