import { api } from "@/lib/api";
import { token } from "@/lib/authenticated";
import { useWorkspaceStore } from "@/store";
import { Workspace } from "@/types/allTypes";
import {  NavigateFunction, useNavigate } from "react-router-dom";

export const useWorkspaceActions = () => {
    const { setWorkspaces,selectedWorkspace } = useWorkspaceStore();
    const navigate = useNavigate();

    const createWorkspace = async (data: { name: string }) => {
        try {
          const response = await api.post(
            "/workspace/create",
            { name: data.name },
            { headers: { token: token } }
          );
          const firstChannelId = await api.get(
            `/workspace/${response.data.data.id}/channel/channelIds`,
            { headers: { token: token } }
          );
          const newWorkspace: Workspace = response.data.data;
          setWorkspaces((prev) => [...prev, newWorkspace]);
          navigate(
            `/workspace/${response.data.data.id}/channel/${firstChannelId.data.id}`
          );
        } catch (error) {
          console.error("WorkspaceModal error : " + error);
          // add toast
        }
      };
      const renameWorkspace = async (data: { name: string }) => {
        try {
          await api.put(
            `/workspace/${selectedWorkspace}`,
            { workspacename: data.name },
            { headers: { token: token } }
          );
          setWorkspaces((prevWorkspaces) =>
            prevWorkspaces.map((workspace) => {
              if (workspace.id === (selectedWorkspace as number)) {
                return { ...workspace, name: data.name };
              }
              return workspace;
            })
          );
          // update workspaces
        } catch (error) {
          console.log(error);
        }
      };
      const deleteWorkspace = async () => {
        try {
          await api.delete(`/workspace/${selectedWorkspace}`, {
            headers: { token: token },
          });
          const res = await api.get("/user/fetchIds", {
            headers: {
              token,
            },
          });
          navigate(
            `/workspace/${res.data.workspaceId}/channel/${res.data.channelId}`
          );
          setWorkspaces((prevWorkspace) =>
            prevWorkspace.filter((workspace) => workspace.id !== selectedWorkspace)
          );
          // update workspaces, navigate, etc.
        } catch (error) {
          console.log(error);
        }
      };
      return { createWorkspace , renameWorkspace , deleteWorkspace}
}
export const handleLogout = (navigate:NavigateFunction) => {
    localStorage.removeItem("buzznettoken");
    navigate("/signin");
}

