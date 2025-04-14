import { Bot } from "lucide-react";

const Navbar = () => {
  return (
    <div className="flex h-16 shrink-0 items-center border-b px-4">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
          <Bot className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-lg font-semibold">Buzzbot</h1>
          <p className="text-xs text-muted-foreground">
            Your general assistant for the workspace
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
