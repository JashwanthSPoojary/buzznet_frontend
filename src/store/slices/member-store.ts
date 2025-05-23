import { api } from "@/lib/api";
import { token } from "@/lib/authenticated";
import { create } from "zustand";

interface Member {
  id: number;
  username: string;
  email: string | null;
}

interface MemberState {
  members: Member[];
  selectedMember: number | undefined;
  setMembers: (members: Member[]) => void;
  setSelectedMember: (memberId: number | undefined) => void;
  fetchMembers: (workspaceId: number | undefined) => Promise<void>;
  getCurrentMember: () => Member | undefined;
}

export const useMemberStore = create<MemberState>((set,get) => ({
  members: [],
  selectedMember: undefined,
  setMembers: (members) => set(() => ({ members })),
  setSelectedMember: (memberId) => set(() => ({ selectedMember: memberId })),
  fetchMembers: async (workspaceId) => {
    if (!token || !workspaceId) return;

    try {
      const response = await api.get(`/workspace/${workspaceId}/members`, {
        headers: { token },
      });
      const members = response.data.data;
      set((state) => {
        if (JSON.stringify(state.members) === JSON.stringify(members)) {
          return {};
        }
        return {members};
      });
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  },
  getCurrentMember:()=>{
    const { selectedMember,members } = get();
    return members.find((member) => member.id === selectedMember);
  },
}));
