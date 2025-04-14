import {  Send } from "lucide-react"
import { Button } from "@/components/ui/button"
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

