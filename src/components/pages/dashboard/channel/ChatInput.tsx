import {  Send, Smile } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { useRef, useState } from "react"

interface ChatInputProps {
  channelName?: string
  recipientName?: string
  onSendMessage?: (data:{message:string}) => void
  className?: string
}

export function ChatInput({ channelName, recipientName, onSendMessage, className }: ChatInputProps) {
  const [message, setMessage] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Sample emoji data - in a real app, you'd use a proper emoji picker library
  const sampleEmojis = ["😀", "😂", "😊", "❤️", "👍", "🎉", "🔥", "✨", "🙌", "👏"]

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage?.({message})
      setMessage("")
      textareaRef.current?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Send message on Enter (without Shift)
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   // Handle file upload logic here
  //   const files = e.target.files
  //   if (files && files.length > 0) {
  //     console.log("Files selected:", files)
  //     // In a real app, you would upload these files to your server
  //   }
  // }

  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      <div className="relative flex items-center">
        {/* File upload button */}
        {/* <Button type="button" variant="ghost" size="icon" className="absolute left-2 h-8 w-8 rounded-full">
          <label htmlFor="file-upload" className="cursor-pointer">
            <Paperclip className="h-5 w-5" />
            <span className="sr-only">Attach files</span>
          </label>
          <input id="file-upload" type="file" multiple className="hidden" onChange={handleFileChange} />
        </Button> */}

        {/* Message input */}
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Message ${channelName ? `#${channelName}` : recipientName}`}
          className="min-h-10 resize-none rounded-md border bg-background pl-10 pr-20 py-2"
          rows={1}
        />

        {/* Emoji picker */}
        <div className="absolute right-12">
          <Popover>
            <PopoverTrigger asChild>
              <Button type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Smile className="h-5 w-5" />
                <span className="sr-only">Add emoji</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-2" align="end">
              <div className="grid grid-cols-5 gap-2">
                {sampleEmojis.map((emoji) => (
                  <Button
                    key={emoji}
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={() => setMessage((prev) => prev + emoji)}
                  >
                    {emoji}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Send button */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleSendMessage}
          disabled={!message.trim()}
          className="absolute right-2 h-8 w-8 rounded-full"
        >
          <Send className="h-5 w-5" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
    </div>
  )
}

