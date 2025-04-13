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

const Dashboard = () => {
  const fetchUser = useUserStore((state) => state.fetchUser);
  const fetchWorkspaces = useWorkspaceStore((state) => state.fetchWorkspaces);
  const selectedWorkspace = useWorkspaceStore((state) => state.selectedWorkspace);
  const fetchChannels = useChannelStore((state) => state.fetchChannels);
  const fetchMembers = useMemberStore((state) => state.fetchMembers);
  const { connect, disconnect } = useWebsocketStore();
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

  return (
    <>
      <RouteHandler />
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
