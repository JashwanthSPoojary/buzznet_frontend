import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { Workspace } from "@/types/allTypes";
import { ChevronDown, Edit, Plus, Trash2 } from "lucide-react";

// SidebarDropdownMenu.tsx
export function SidebarDropdownMenu({
    workspace,
    setCreateWorkspaceOpen,
    setRenameWorkspaceOpen,
    setDeleteWorkspaceOpen,
  }: {
    workspace: Workspace | undefined;
    setCreateWorkspaceOpen: (open: boolean) => void;
    setRenameWorkspaceOpen: (open: boolean) => void;
    setDeleteWorkspaceOpen: (open: boolean) => void;
  }) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <SidebarMenuButton size="lg">
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
              {workspace?.name.charAt(0)}
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{workspace?.name}</span>
              <span className="truncate text-xs">Buzznet</span>
            </div>
            <ChevronDown className="ml-auto h-4 w-4" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuItem className="p-0">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => setRenameWorkspaceOpen(true)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Rename Workspace
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-0">
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive"
              onClick={() => setDeleteWorkspaceOpen(true)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Workspace
            </Button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="p-0">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => setCreateWorkspaceOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create New Workspace
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  