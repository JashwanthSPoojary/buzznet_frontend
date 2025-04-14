import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LogOut, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWorkspaceStore } from "@/store/slices/workspace-store";
import { NavWorkspaces } from "../sidebar/NavWorkspaces";
import { useMemo, useState } from "react";
import { NavChannels } from "./NavChannels";
import { UserProfile } from "../sidebar/UserProfile";
import { useTheme } from "@/hooks/useTheme";
import {
  CreateWorkspaceModal,
  DeleteWorkspaceModal,
  RenameWorkspaceModal,
} from "../modals/WorkspaceModals";

import { useNavigate } from "react-router-dom";
import { handleLogout, useWorkspaceActions } from "@/hooks/useWorkspaceActions";
import { SidebarDropdownMenu } from "./SidebarDropdown";
import { NavDirectMessages } from "./NavDirectMessages";
import InviteModal from "../modals/InviteModal";
import { NavChatbot } from "./NavChatbot";

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const navigate = useNavigate();
  const { createWorkspace, renameWorkspace, deleteWorkspace } =
    useWorkspaceActions();
  const { workspaces, selectedWorkspace } = useWorkspaceStore();
  const workspace = useMemo(() => {
    return workspaces.find((workspace) => workspace.id === selectedWorkspace);
  }, [selectedWorkspace, workspaces]);
  const { theme, setTheme } = useTheme();
  const [createWorkspaceOpen, setCreateWorkspaceOpen] = useState(false);
  const [renameWorkspaceOpen, setRenameWorkspaceOpen] = useState(false);
  const [deleteWorkspaceOpen, setDeleteWorkspaceOpen] = useState(false);
  const [inviteWorkspaceOpen, setInviteWorkspaceOpen] = useState(false);


  const handleCreateWorkspace = async (data: { name: string }) => {
    await createWorkspace({ name: data.name });
    setCreateWorkspaceOpen(false);
  };
  const handleRenameWorkspace = async (data: { id: number; name: string }) => {
    await renameWorkspace({ name: data.name });
    setRenameWorkspaceOpen(false);
  };
  const handleDeleteWorkspace = async () => {
    await deleteWorkspace();
    setDeleteWorkspaceOpen(false);
  };
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarDropdownMenu
              workspace={workspace}
              setCreateWorkspaceOpen={setCreateWorkspaceOpen}
              setRenameWorkspaceOpen={setRenameWorkspaceOpen}
              setDeleteWorkspaceOpen={setDeleteWorkspaceOpen}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavWorkspaces
          setCreateWorkspaceOpen={setCreateWorkspaceOpen}
          workspaces={workspaces}
          currentWorkspace={workspace}
        />
        <NavChannels />
        <NavDirectMessages setInvite={setInviteWorkspaceOpen}/> 
        <NavChatbot/>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center justify-between p-2">
          <UserProfile />
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full cursor-pointer"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full cursor-pointer"
              onClick={() => handleLogout(navigate)}
            >
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Logout</span>
            </Button>
          </div>
        </div>
      </SidebarFooter>
      <CreateWorkspaceModal
        open={createWorkspaceOpen}
        onOpenChange={setCreateWorkspaceOpen}
        onConfirm={handleCreateWorkspace}
      />
      <RenameWorkspaceModal
        open={renameWorkspaceOpen}
        onOpenChange={setRenameWorkspaceOpen}
        onConfirm={handleRenameWorkspace}
        workspace={workspace}
      />
      <DeleteWorkspaceModal
        open={deleteWorkspaceOpen}
        onOpenChange={setDeleteWorkspaceOpen}
        onConfirm={handleDeleteWorkspace}
        workspace={workspace}
      />
      <InviteModal inviteModal={inviteWorkspaceOpen} setInviteModal={setInviteWorkspaceOpen}/>
    </Sidebar>
  );
};

export default AppSidebar;
