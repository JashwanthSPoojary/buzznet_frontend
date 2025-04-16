import { SidebarTrigger } from "@/components/ui/sidebar";
import { Loader2 } from "lucide-react";

const Navbar = ({ channelName }: { channelName: string | undefined }) => {
  return (
    <div className="flex h-16 shrink-0 items-center border-b px-4 sticky top-0 ">
      <SidebarTrigger className="-ml-1 mr-2" />
      <div className="flex items-center">
        {channelName?
        <h1 className="text-xl font-semibold"># {channelName}</h1>:
        <Loader2 className="animate-spin"/>
      }
        
      </div>
    </div>
  );
};

export default Navbar;
