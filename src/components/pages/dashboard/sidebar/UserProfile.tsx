import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useUserStore } from "@/store/slices/user-store"
export function UserProfile() {
    const username = useUserStore(state=>state.user?.username);
  return (
        <Button variant="ghost" className="h-8 gap-2 px-2">
          <Avatar className="h-6 w-6">
            <AvatarFallback>{username?.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{username}</span>
        </Button>
      
  )
}

