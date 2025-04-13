import { MoreHorizontal, Trash2 } from "lucide-react"
import { Avatar, AvatarFallback} from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { formatTimestamp } from "@/lib/formatTImeStamp"
import { api } from "@/lib/api"
import { useChannelStore, useWorkspaceStore } from "@/store"
import { token } from "@/lib/authenticated"

interface MessageItemProps {
  id: number
  content: string | null
  timestamp: Date
  sender: string
  isCurrentUser: boolean
  onDelete: (id: number) => void
}

export function MessageItem({ id, content, timestamp, sender, isCurrentUser, onDelete }: MessageItemProps) {
  const selectedChannel = useChannelStore(state=>state.selectedChannel);
  const selectedWorkspace = useWorkspaceStore(state=>state.selectedWorkspace);
  const handleDelete = async () => {
    try {
      const response = await api.delete(
        `/workspace/${selectedWorkspace}/channel/${selectedChannel}/message/${id}`,
        { headers: { token: token } }
      );
      if (response.data.message) {
        onDelete(id);
      } else {
        console.log("not able to delete");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={`flex items-start gap-3 ${isCurrentUser ? "flex-row-reverse self-end" : "self-start"} max-w-[80%]`}>
      {!isCurrentUser && (
        <Avatar className="h-10 w-10 shrink-0">
          <AvatarFallback>{sender.charAt(0)}</AvatarFallback>
        </Avatar>
      )}

      <div className={`flex flex-col ${isCurrentUser ? "items-end" : "items-start"}`}>
        <div className="flex items-center gap-2">
          <span className={`font-medium ${isCurrentUser ? "order-2" : "order-1"}`}>{sender}</span>
          <span className={`text-xs text-muted-foreground ${isCurrentUser ? "order-1" : "order-2"}`}>{formatTimestamp(timestamp)}</span>
        </div>

        <div className="group relative">
          <div className={`mt-1 rounded-lg p-3 ${isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
            <p className="text-sm">{content}</p>
          </div>

          <div
            className={`absolute ${isCurrentUser ? "-left-8" : "-right-8"} top-0 opacity-0 group-hover:opacity-100 transition-opacity`}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Message options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isCurrentUser ? "start" : "end"}>
                <DropdownMenuItem className="text-destructive" onClick={handleDelete}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  )
}
