import { useMemberStore } from "@/store/slices/member-store";
import Navbar from "./Navbar";
import { useEffect, useRef } from "react";
import { useDMStore } from "@/store/slices/dm-store";
import { MessageItem } from "./MessageItem";
import { useUserStore } from "@/store/slices/user-store";
import { useWorkspaceStore } from "@/store";
import { useWebsocketStore } from "@/store/slices/ws-store";
import { ChatInput } from "./ChatInput";
import { DirectMessageWelcome } from "../WelcomeHeaders";

const DirectMessage = () => {
  const { messages, fetchMessages, setMessages } = useDMStore();
  const userId = useUserStore((state) => state.user?.id);
  const ws = useWebsocketStore((state) => state.ws);
  const sendMessage = useWebsocketStore((state) => state.sendMessage);

  const memberName = useMemberStore(
    (state) => state.getCurrentMember()?.username
  );
  const { selectedMember } = useMemberStore();
  const selectedWorkspace = useWorkspaceStore(
    (state) => state.selectedWorkspace
  );
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (data: { message: string }) => {
    if (!ws || ws.readyState != WebSocket.OPEN) {
      console.error("WebSocket is not connected.");
      return;
    }
    if (!data.message.trim()) {
        console.error("Message or file must be provided!");
        return;
    }
    if (!selectedMember) {
      console.error(
        "Invalid input: Ensure member, sender, and message/file are provided."
      );
      return;
    }
    try {
      const payload = JSON.stringify({
        type: "dm",
        content: data.message.trim(),
        userId: userId,
        peerId: selectedMember,
        workspaceId: selectedWorkspace,
      });
      sendMessage(payload);
    } catch (error) {
      console.error("handle submit error :", error);
    }
  };
  const handleDeleteMessage = () => {};
  useEffect(() => {
    if (!selectedWorkspace || !selectedMember || !userId) return;
    try {
      fetchMessages(selectedWorkspace, userId, selectedMember);
    } catch (error) {
      console.error("error in fetchmessages: ", error);
    }
  }, [selectedMember, selectedWorkspace, userId]);
  useEffect(() => {
    if (!ws || !selectedMember || !userId) return;

    const handleOpen = () => {
      console.log("dm ws open");
      ws.send(
        JSON.stringify({
          type: "join-dm",
          userId: userId,
          peerId: selectedMember,
        })
      );
    };
    if (ws.readyState === WebSocket.OPEN) {
      handleOpen();
    } else {
      ws.addEventListener("open", handleOpen);
    }

    const handleMessage = (event: MessageEvent) => {
      const newMessage = JSON.parse(event.data);
      setMessages((prev) => [...prev, newMessage]);
    };
    ws.addEventListener("message", handleMessage);
    return () => {
      ws.removeEventListener("message", handleMessage);
    };
  }, [ws, selectedMember, userId]);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <Navbar memberName={memberName} />
      <div className="flex flex-1 flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto p-4 flex flex-col space-y-4"
          >
            <DirectMessageWelcome name={memberName}/>
            {messages.map((message) => (
              <MessageItem
                key={message.id}
                id={message.id}
                content={message.content}
                timestamp={message.created_at}
                sender={message.sender.username}
                isCurrentUser={message.sender_id === userId}
                onDelete={handleDeleteMessage}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="border-t p-4 sticky bottom-0 bg-background z-10">
          <ChatInput memberName={memberName} onSendMessage={handleSubmit} />
        </div>
      </div>
    </>
  );
};

export default DirectMessage;
