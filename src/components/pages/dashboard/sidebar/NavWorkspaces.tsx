"use client"
import { Plus } from "lucide-react"

import { SidebarGroup, SidebarGroupLabel } from "@/components/ui/sidebar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useWorkspaceStore } from "@/store";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { token } from "@/lib/authenticated";

/**
 * NavWorkspaces Component
 *
 * This component renders the list of workspaces and allows switching between them.
 * It provides functionality for:
 * - Viewing all available workspaces
 * - Switching between workspaces
 * - Creating new workspaces
 */

// Update the Workspace type to be more descriptive
interface Owner {
    id: number;
    created_at: Date;
    username: string;
    email: string | null;
    password_hash: string;
}
interface Workspace {
    name: string;
    id: number;
    owner_id: number;
    owner: Owner;
}

export function NavWorkspaces({
  workspaces,
  currentWorkspace,
  setCreateWorkspaceOpen
}: {
  workspaces: Workspace[]
  currentWorkspace: Workspace | undefined
  setCreateWorkspaceOpen:React.Dispatch<React.SetStateAction<boolean>>

}) {
  const { setSelectedWorkspace } = useWorkspaceStore();
  const navigate = useNavigate();
  // Function to handle workspace creation
  const handleCreateWorkspace = () => {
    setCreateWorkspaceOpen(true);
  }
  const onWorkspaceChange = async (workspaceId:number) => {
    const channelId = await api.get(
      `/workspace/${workspaceId}/channel/channelIds`,
      { headers: { token: token } }
    );
    setSelectedWorkspace(workspaceId);
    navigate(`/workspace/${workspaceId}/channel/${channelId.data.id}`);
  }

  return (
    <SidebarGroup className="px-2">
      <SidebarGroupLabel className="px-2">Workspaces</SidebarGroupLabel>
      <div className="flex flex-wrap gap-2 py-2">
        <TooltipProvider>
          {/* Map through all workspaces */}
          {workspaces.map((workspace) => (
            <Tooltip key={workspace.id}>
              <TooltipTrigger asChild>
                <button
                  className={`flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium transition-colors cursor-pointer ${
                    workspace.id === currentWorkspace?.id
                      ? "bg-secondary-foreground text-sidebar-primary-foreground"
                      : "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/80"
                  }`}
                  onClick={() => onWorkspaceChange(Number(workspace.id))}
                  aria-label={`Switch to ${workspace.name} workspace`}
                  aria-current={workspace.id === currentWorkspace?.id ? "true" : "false"}
                >
                  {workspace.name.charAt(0)}
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{workspace.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}

          {/* Create new workspace button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-md bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/80 cursor-pointer"
                onClick={handleCreateWorkspace}
                aria-label="Create new workspace"
              >
                <Plus className="h-5 w-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Create Workspace</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </SidebarGroup>
  )
}

