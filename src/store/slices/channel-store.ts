import { create } from "zustand";
import { api } from "@/lib/api";
import { token } from "@/lib/authenticated";
import { Channel } from "@/types/allTypes";



interface ChannelState {
  channels: Channel[];
  selectedChannel: number | undefined;
  setChannels: (channels: Channel[] | ((prev: Channel[]) => Channel[])) => void;
  setSelectedChannel: (channelId: number | undefined) => void;
  fetchChannels: (workspaceId: number | undefined) => Promise<void>;
  getCurrentChannel: () => Channel | undefined;
}

export const useChannelStore = create<ChannelState>((set, get) => ({
  channels: [],
  selectedChannel: undefined,

  setChannels: (channels) =>
    set((state) => ({
      channels:
        typeof channels === "function" ? channels(state.channels) : channels,
    })),

  setSelectedChannel: (channelId) => set(() => ({ selectedChannel: channelId })),

  fetchChannels: async (workspaceId) => {
    if (!token || !workspaceId) return;
    try {
      const response = await api.get(
        `/workspace/${workspaceId}/channel/getchannels`,
        { headers: { token } }
      );
      const channels = response.data.data;
      set((state) => {
        if (JSON.stringify(state.channels) === JSON.stringify(channels)) {
          return {};
        }
        return { channels };
      });
    } catch (error) {
      console.error("Error fetching channels:", error);
    }
  },

  getCurrentChannel: () => {
    const { selectedChannel, channels } = get();
    return channels.find((channel) => channel.id === selectedChannel);
  },
}));
