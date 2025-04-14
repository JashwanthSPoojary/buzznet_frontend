import { Bot } from "lucide-react";

const MessageItem = ({ author, content }: { author: string; content: string }) => {
  const isUser = author === "user";

  return (
    <div
      className={`flex gap-3 mb-4 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {/* Avatar / Icon */}
      {!isUser && (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          <Bot className="h-6 w-6 text-primary" />
        </div>
      )}

      <div className={`flex flex-col max-w-xs ${isUser ? "items-end" : "items-start"}`}>
        <div className="flex items-center gap-2">
          <span className="font-medium">
            {isUser ? "You" : "Buzzbot"}
          </span>
          <span className="text-xs text-muted-foreground">
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        <p className={`text-sm p-2 rounded-lg ${isUser ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
          {content}
        </p>
      </div>
    </div>
  );
};

export default MessageItem;
