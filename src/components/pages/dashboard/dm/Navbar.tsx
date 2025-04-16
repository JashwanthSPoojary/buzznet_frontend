import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useWorkspaceStore } from "@/store";
import { useMemberStore } from "@/store/slices/member-store";
import { Tooltip, TooltipTrigger } from "@radix-ui/react-tooltip";
import { Loader2, PhoneCall } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ memberName }: { memberName: string | undefined }) => {
  const navigate = useNavigate();
  const selectedWorkspace = useWorkspaceStore(
    (state) => state.selectedWorkspace
  );
  const selectedMember = useMemberStore((state) => state.selectedMember);
  return (
    <div className="flex h-16 shrink-0 items-center justify-between border-b px-4 sticky top-0 ">
      <div className="flex">
        <SidebarTrigger className="-ml-1 mr-2" />
        <div className="flex items-center">
          {memberName ? (
            <h1 className="text-xl font-semibold"># {memberName}</h1>
          ) : (
            <Loader2 className="animate-spin" />
          )}
        </div>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() =>
                navigate(
                  `/workspace/${selectedWorkspace}/dm/${selectedMember}/video`
                )
              }
              // disabled={recipient.status === "offline"}
            >
              <PhoneCall className="h-5 w-5" />
              <span className="sr-only">Start video call</span>
            </Button>
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default Navbar;
