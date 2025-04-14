import { Bot } from "lucide-react"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useWorkspaceStore } from "@/store"
import { useNavigate } from "react-router-dom";


export function NavChatbot() {
    const selectedWorkspace = useWorkspaceStore(state=>state.selectedWorkspace);
    const navigate = useNavigate();
  return (
    <SidebarGroup>
      <div className="flex items-center justify-between px-3 py-2">
        <SidebarGroupLabel className="mb-0">AI Assistant</SidebarGroupLabel>
      </div>
      <SidebarMenu>
          <SidebarMenuItem >
            <SidebarMenuButton
              asChild
            >
              <button onClick={()=>navigate(`/workspace/${selectedWorkspace}/chatbot`)}  className="relative">
                <Bot className="h-4 w-4" />
                <span>Buzzbot</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
