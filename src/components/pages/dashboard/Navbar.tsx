import { SidebarTrigger } from "@/components/ui/sidebar";

const Navbar = ({channelName}:{channelName:string|undefined}) => {
  return (
    <div className="flex h-16 shrink-0 items-center border-b px-4 sticky top-0 bg-background z-10">
      <SidebarTrigger className="-ml-1 mr-2" />
      <div className="flex items-center">
        <h1 className="text-xl font-semibold"># {channelName}</h1>
      </div>
    </div>
  );
};

export default Navbar;
