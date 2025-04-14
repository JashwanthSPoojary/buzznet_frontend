"use client";

import { Hash, Plus, Settings } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuAction,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { useChannelStore, useWorkspaceStore } from "@/store";
import {
  CreateChannelModal,
  RenameChannelModal,
} from "../modals/ChannelModals";
import { useMemo, useState } from "react";
import { api } from "@/lib/api";
import { token } from "@/lib/authenticated";
import { useNavigate } from "react-router-dom";

/**
 * NavChannels Component
 *
 * This component renders the list of channels in the current workspace.
 * It provides functionality for:
 * - Viewing all channels
 * - Creating new channels
 * - Renaming existing channels
 * - Deleting channels
 * - Showing unread indicators
 */

// Update the Channel type to be more descriptive

export function NavChannels() {
  const navigate = useNavigate();
  const { selectedWorkspace } = useWorkspaceStore();
  const { channels, selectedChannel, setChannels } = useChannelStore();
  const [createChannelOpen, setCreateChannelOpen] = useState(false);
  const [renameChannelOpen, setRenameChannelOpen] = useState(false);
  const channel = useMemo(() => {
    return channels.find((channel) => channel.id === selectedChannel);
  }, [selectedChannel, channels]);

  // Function to handle channel creation
  const handleCreateChannel = async (data: { name: string }) => {
    try {
      const response = await api.post(
        `/workspace/${selectedWorkspace}/channel/create`,
        { name: data.name },
        { headers: { token: token } }
      );
      setChannels((prev) => [...prev, response.data.data]);
      navigate(
        `/workspace/${selectedWorkspace}/channel/${response.data.data.id}`
      );
      setCreateChannelOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle channel renaming
  const handleRenameChannel = async (data: { name: string }) => {
    try {
      await api.put(
        `/workspace/${selectedWorkspace}/channel/${selectedChannel}`,
        { channelname: data.name },
        { headers: { token: token } }
      );
      setChannels((prevChannels) =>
        prevChannels.map((channel) => {
          if (channel.id === selectedChannel) {
            return { ...channel, name: data.name };
          }
          return channel;
        })
      );
      setRenameChannelOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle channel deletion
  const handleDeleteChannel = async () => {
    try {
      await api.delete(
        `/workspace/${selectedWorkspace}/channel/${selectedChannel}`,
        { headers: { token: token } }
      );
      setChannels((prevChannels) =>
        prevChannels.filter((channel) => channel.id !== selectedChannel)
      );
    } catch (error) {
      console.log(error);
    }
  };
  const onChannelChange = async (channelId: number) => {
    navigate(`/workspace/${selectedWorkspace}/channel/${channelId}`);
  };

  return (
    <SidebarGroup>
      <div className="flex items-center justify-between px-3 py-2">
        <SidebarGroupLabel className="mb-0">Channels</SidebarGroupLabel>
        <Button
          variant="ghost"
          size="icon"
          className="h-5 w-5 cursor-pointer"
          onClick={() => setCreateChannelOpen(true)}
          title="Create Channel"
        >
          <Plus className="h-4 w-4" />
          <span className="sr-only">Add Channel</span>
        </Button>
      </div>
      <SidebarMenu>
        {channels.map((channel) => (
          <SidebarMenuItem key={channel.id}>
            <SidebarMenuButton
              asChild
              isActive={channel.id === selectedChannel ? true : false}
            >
              <button onClick={() => onChannelChange(channel.id)}>
                <Hash className="h-4 w-4" />
                <span>{channel.name}</span>
                {/* {channel.unread && <span className="ml-auto flex h-2 w-2 rounded-full bg-sidebar-primary"></span>} */}
              </button>
            </SidebarMenuButton>
            <DropdownMenu>
              {channel.id === selectedChannel ? (
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction>
                    <Settings className="h-4 w-4" />
                    <span className="sr-only">Channel Settings</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
              ) : null}
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem className="p-0">
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setRenameChannelOpen(true)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Rename Channel
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="p-0">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-destructive"
                    onClick={() => handleDeleteChannel()}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Channel
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
      <CreateChannelModal
        open={createChannelOpen}
        onOpenChange={setCreateChannelOpen}
        onConfirm={handleCreateChannel}
        workspaceId={selectedWorkspace}
      />
      {selectedChannel && (
        <>
          <RenameChannelModal
            open={renameChannelOpen}
            onOpenChange={setRenameChannelOpen}
            onConfirm={handleRenameChannel}
            workspaceId={selectedWorkspace}
            channel={channel}
          />
        </>
      )}
    </SidebarGroup>
  );
}
