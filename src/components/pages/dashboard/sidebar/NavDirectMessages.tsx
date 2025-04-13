import { Plus } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useMemberStore } from "@/store/slices/member-store";
import { useNavigate } from "react-router-dom";
import { useWorkspaceStore } from "@/store";
import { useUserStore } from "@/store/slices/user-store";
import { useMemo } from "react";

export function NavDirectMessages({setInvite}:{setInvite:React.Dispatch<React.SetStateAction<boolean>>}) {
  const navigate = useNavigate();
  const { members } = useMemberStore();
  const { selectedWorkspace, workspaces } = useWorkspaceStore();
  const userId = useUserStore((state) => state.user?.id);
  const workspace = useMemo(
    () => workspaces.find((workspace) => workspace.id === selectedWorkspace),
    [workspaces, selectedWorkspace]
  );

  return (
    <SidebarGroup>
      <div className="flex items-center justify-between px-3 py-2">
        <SidebarGroupLabel className="mb-0">Direct Messages</SidebarGroupLabel>
        {workspace?.owner_id === userId ? (
          <Button
          variant="ghost"
          size="icon"
          className="h-5 w-5 cursor-pointer"
          onClick={()=>setInvite(true)}
          title="Invite"
        >
          <Plus className="h-4 w-4" />
          <span className="sr-only">Invite</span>
        </Button>
        ):null}
      </div>
      <SidebarMenu>
        {members.map(
          (member) =>
            member.id !== userId && (
              <SidebarMenuItem key={member.id}>
                <SidebarMenuButton asChild>
                  <button
                    onClick={() =>
                      navigate(
                        `/workspace/${selectedWorkspace}/dm/${member.id}`
                      )
                    }
                    className="relative"
                  >
                    <span className="relative flex h-6 w-6 shrink-0 overflow-hidden rounded-full">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback>
                          {member.username.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </span>
                    <span>{member.username}</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
