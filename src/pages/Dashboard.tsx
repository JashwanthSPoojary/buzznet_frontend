import AppSidebar from "@/components/pages/dashboard/sidebar/AppSidebar";
import RouteHandler from "@/components/pages/dashboard/RouteHandler";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useChannelStore } from "@/store";
import { useUserStore } from "@/store/slices/user-store";
import { useWorkspaceStore } from "@/store/slices/workspace-store";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useWebsocketStore } from "@/store/slices/ws-store";
import env from "@/lib/config";
import { useMemberStore } from "@/store/slices/member-store";
import { useCallStore } from "@/store/slices/call-store";
import CallNotification from "@/components/pages/dashboard/dm/video/CallNotification";

const Dashboard = () => {
  const initializePeer = useCallStore(state=>state.initializePeer);
  const fetchUser = useUserStore((state) => state.fetchUser);
  const fetchWorkspaces = useWorkspaceStore((state) => state.fetchWorkspaces);
  const selectedWorkspace = useWorkspaceStore((state) => state.selectedWorkspace);
  const fetchChannels = useChannelStore((state) => state.fetchChannels);
  const fetchMembers = useMemberStore((state) => state.fetchMembers);
  const { connect, disconnect ,ws } = useWebsocketStore();
  useEffect(() => {
    fetchWorkspaces();
    fetchUser();
  }, []);
  useEffect(() => {
    if (!selectedWorkspace) return;
    fetchChannels(selectedWorkspace);
    fetchMembers(selectedWorkspace);
  }, [selectedWorkspace]);
  useEffect(() => {
    connect(env.ws_url);
    return () => {
      disconnect();
    };
  }, []);
  useEffect(() => {
    if (ws?.readyState === WebSocket.OPEN) {
      console.log("WebSocket is open, initializing peer");
      initializePeer();
    } else {
      console.log("WebSocket not ready:", ws?.readyState);
    }
  }, [ws?.readyState]);

  return (
    <>
      <RouteHandler />
      <CallNotification/>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default Dashboard;
