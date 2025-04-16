import { useChannelStore, useWorkspaceStore } from "@/store";
import Navbar from "./Navbar";
import { ChatInput } from "./ChatInput";
import { useMessageStore } from "@/store/slices/message-store";
import { useWebsocketStore } from "@/store/slices/ws-store";
import { useEffect, useMemo, useRef } from "react";
import { useUserStore } from "@/store/slices/user-store";
import { MessageItem } from "./MessageItem";
import { ChannelWelcome } from "../WelcomeHeaders";
import { Loader2 } from "lucide-react";

const ChannelMessage = () => {
  const channelName = useChannelStore(
    (state) => state.getCurrentChannel()?.name
  );
  const { messages, setMessages, fetchMessages } = useMessageStore();
  const { sendMessage, ws } = useWebsocketStore();
  const { selectedChannel } = useChannelStore();
  const selectedWorkspace = useWorkspaceStore(
    (state) => state.selectedWorkspace
  );
  const userId = useUserStore((state) => state.user?.id);
  const sender = useMemo(() => userId, [userId]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (data: { message: string }) => {
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not connected.");
      return;
    }
    if (!data.message.trim()) {
      console.error("Message or file must be provided!");
      return;
    }
    if (!selectedChannel || !sender) {
      console.error(
        "Invalid input: Ensure channel, sender, and message/file are provided."
      );
      return;
    }
    try {
      const payload = JSON.stringify({
        type: "message",
        content: data.message.trim(),
        channelId: selectedChannel,
        userId: sender,
        timestamp: new Date().toISOString(),
        file: null,
      });
      sendMessage(payload);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteMessage = () => {};

  useEffect(() => {
    if (!selectedWorkspace || !selectedChannel) return;
    try {
      fetchMessages(selectedWorkspace, selectedChannel);
    } catch (error) {
      console.error("error in fetchmessages: ", error);
    }
  }, [selectedChannel, selectedWorkspace]);
  useEffect(() => {
    if (!ws) return;
    if (!selectedChannel) return;

    const handleOpen = () => {
      console.log("channel message ws open");
      ws.send(
        JSON.stringify({ type: "join-channel", channelId: selectedChannel })
      );
    };
    if (ws.readyState === WebSocket.OPEN) {
      handleOpen();
    } else {
      ws.addEventListener("open", handleOpen);
    }

    const handleMessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data);
      if (message.type === "message") {
        setMessages((prev) => [...prev, message]);
      } else if (message.type === "messageDeleted") {
        setMessages((prev) =>
          prev.filter((msg) => msg.id !== message.messageId)
        );
      }
    };
    ws.addEventListener("message", handleMessage);

    return () => {
      ws.removeEventListener("open", handleOpen);
      ws.removeEventListener("message", handleMessage);
    };
  }, [ws, selectedChannel]);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <Navbar channelName={channelName} />
      <div className="flex flex-1 flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto p-4 flex flex-col space-y-4"
          >
            {channelName ? (
              <ChannelWelcome name={channelName} />
            ) : (
              <div className="flex flex-col items-center justify-center">
                <Loader2 className="animate-spin " />
              </div>
            )}
            {messages?messages.map((message) => (
              <MessageItem
                key={message.id}
                id={message.id}
                content={message.content}
                timestamp={message.created_at}
                sender={message.sender.username}
                isCurrentUser={message.sender.id === userId}
                onDelete={handleDeleteMessage}
              />
            )):(
              <div className="flex flex-col items-center justify-center">
                <Loader2 className="animate-spin " />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="border-t p-4 sticky bottom-0 z-10">
          <ChatInput channelName={channelName} onSendMessage={handleSubmit} />
        </div>
      </div>
    </>
  );
};

export default ChannelMessage;
