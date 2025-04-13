import { useChannelStore, useWorkspaceStore } from "@/store";
import React, { useEffect, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
// import { useChannelStore, useMemberStore, useWorkspaceStore } from "../stores";


const RouteHandler = () => {
  const { workspaceId, channelId } = useParams<{ workspaceId: string; channelId?: string }>();
  const { setSelectedWorkspace, workspaces } = useWorkspaceStore();
  const { channels, setSelectedChannel } = useChannelStore();
  // const { members, setSelectedMember } = useMemberStore();
  
  const prevWorkspace = useRef<number | undefined>(undefined);
  const prevChannel = useRef<number | undefined>(undefined);
  // const prevMember = useRef<number | undefined>(undefined);

  const workspaceExists = useMemo(() => new Set<number>(workspaces.map((w) => w.id)), [workspaces]);
  const channelExists = useMemo(() => new Set(channels.map((c) => c.id)), [channels]);
  // const memberExists = useMemo(() => new Set(members.map((m) => m.id)), [members]);

  useEffect(() => {
    const updateState = (
      id: number | undefined,
      exists: Set<number>,
      setFunction: (id: number) => void,
      prevRef: React.MutableRefObject<number | undefined>
    ) => {
      if (id !== prevRef.current && id !== undefined && exists.has(id)) {
        setFunction(id);
        prevRef.current = id;
      }
    };

    const workspaceIdNum = workspaceId ? parseInt(workspaceId, 10) : undefined;
    const channelIdNum = channelId ? parseInt(channelId, 10) : undefined;

    updateState(workspaceIdNum, workspaceExists, setSelectedWorkspace, prevWorkspace);
    updateState(channelIdNum, channelExists, setSelectedChannel, prevChannel);
  }, [workspaceId, channelId, workspaceExists, channelExists ]);

  return null;
};

export default RouteHandler;
