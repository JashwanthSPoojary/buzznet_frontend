import { create } from "zustand";
import { api } from "@/lib/api";
import { token } from "@/lib/authenticated";
import { Message } from "@/types/allTypes";

interface MessageState {
  messages: Message[];
  setMessages: (messages: Message[] | ((prev: Message[]) => Message[])) => void;
  fetchMessages: (workspaceId: number, channelId: number) => Promise<void>;
}

export const useMessageStore = create<MessageState>((set) => ({
  messages: [],
  setMessages: (messages) =>
    set((state) => ({
      messages: typeof messages === "function" ? messages(state.messages) : messages,
    })),
  fetchMessages: async (workspaceId, channelId) => {
    if (!token || !workspaceId || !channelId) return;
    try {
      const response = await api.get(
        `/workspace/${workspaceId}/channel/${channelId}/getmessages`,
        { headers: { token: token } }
      );
      set(() => ({ messages: response.data.data }));
    } catch (error) {
      console.log("Error fetching messages:", error);
    }
  },
}));
