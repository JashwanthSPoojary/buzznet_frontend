import { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import { api } from "@/lib/api";
import { token } from "@/lib/authenticated";
import MessageItem from "./MessageItem";
import { ChatInput } from "./ChatInput";
import { ChatbotWelcome } from "../WelcomeHeaders";

const Chatbot = () => {
  const [messages, setMessages] = useState<
    { content: string; author: string }[]
  >([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleSubmit = async (data: { message: string }) => {
    try {
      const userMessage = { content: data.message, author: "user" };
      setMessages((prev) => [...prev, userMessage]);
      const response = await api.post(
        "/chatbot/chatbot",
        { message: data.message },
        { headers: { token: token } }
      );
      const botMessage = { content: response.data.data, author: "chatbot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Failed to send chatbot message:", error);
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <>
      <Navbar />
      <div className="flex flex-1 flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto p-4 flex flex-col space-y-4"
          >
            <ChatbotWelcome name="Buzzbot"/> 
            {messages.map((message,index) => (
              <MessageItem author={message.author} content={message.content} key={index}/>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="border-t p-4 sticky bottom-0 bg-background z-10">
          <ChatInput channelName="buzzbot" onSendMessage={handleSubmit} />
        </div>
      </div>
    </>
  );
};

export default Chatbot;
