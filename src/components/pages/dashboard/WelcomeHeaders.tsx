import type React from "react"
import { Bot, Hash, Info, MessageSquare, Users } from "lucide-react"

interface WelcomeProps {
  title: string
  description: string
  icon: React.ReactNode
}

function WelcomeHeader({ title, description, icon }: WelcomeProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center ">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">{icon}</div>
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-muted-foreground max-w-md">{description}</p>
    </div>
  )
}

export function ChannelWelcome({ name }: { name: string|undefined }) {
  return (
    <WelcomeHeader
      title={`Welcome to #${name}`}
      description={`This is the start of the #${name} channel. This channel is for team-wide communication and announcements. All team members are in this channel.`}
      icon={<Hash className="h-8 w-8 text-primary" />}
    />
  )
}

export function DirectMessageWelcome({ name }: { name: string | undefined }) {
  return (
    <WelcomeHeader
      title={`Conversation with ${name}`}
      description={`This is the beginning of your direct message history with ${name}. Only the two of you are in this conversation. Messages are private .`}
      icon={<MessageSquare className="h-8 w-8 text-primary" />}
    />
  )
}

export function ChatbotWelcome({ name}: { name: string}) {
  return (
    <WelcomeHeader
      title={`Chat with ${name}`}
      description="Your general assistant for the workspace"
      icon={<Bot className="h-8 w-8 text-primary" />}
    />
  )
}

export function GeneralChannelInfo() {
  return (
    <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg mb-4">
      <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
      <div>
        <h3 className="font-medium mb-1">About this channel</h3>
        <p className="text-sm text-muted-foreground">
          Channels are where your team communicates. They're best when organized around a topic — #marketing, for
          example.
        </p>
        <div className="mt-3 flex gap-2">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="h-3.5 w-3.5" />
            <span>4 members</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Hash className="h-3.5 w-3.5" />
            <span>Public channel</span>
          </div>
        </div>
      </div>
    </div>
  )
}
