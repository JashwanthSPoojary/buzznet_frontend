"use client"

import * as React from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Types for the channel modals
interface ChannelModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (data: any) => void
  workspaceId: number | undefined
}
interface Channel {
  name: string;
  workspace_id: number;
  id: number;
}

interface CreateChannelModalProps extends ChannelModalProps {}

interface RenameChannelModalProps extends ChannelModalProps {
  channel: Channel | undefined
}

interface DeleteChannelModalProps extends ChannelModalProps {
  channel: Channel | undefined
}

// Create Channel Modal
export function CreateChannelModal({ open, onOpenChange, onConfirm, workspaceId }: CreateChannelModalProps) {
  const [name, setName] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Reset form when modal opens
  React.useEffect(() => {
    if (open) {
      setName("")
      // Focus the input when the modal opens
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onConfirm({ name, workspaceId })
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Channel</DialogTitle>
            <DialogDescription>Create a new channel in this workspace.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="channel-name">Channel Name</Label>
              <Input
                id="channel-name"
                ref={inputRef}
                value={name}
                onChange={(e) => setName(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                placeholder="Enter channel name"
              />
      
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
             type="submit" disabled={!name.trim()}>
              Create Channel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// Rename Channel Modal
export function RenameChannelModal({ open, onOpenChange, onConfirm, workspaceId, channel }: RenameChannelModalProps) {
  const [name, setName] = React.useState(channel?.name || "")
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Update name when channel changes
  React.useEffect(() => {
    if (channel) {
      setName(channel.name)
    }
  }, [channel])

  // Focus the input when the modal opens
  React.useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim() && channel) {
      onConfirm({ id: channel.id, name, workspaceId })
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Rename Channel</DialogTitle>
            <DialogDescription>Change the name of your channel.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="channel-name">Channel Name</Label>
              <Input
                id="channel-name"
                ref={inputRef}
                value={name}
                onChange={(e) => setName(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                placeholder="Enter channel name"
              />
              <p className="text-xs text-muted-foreground">
                Channel names must be lowercase, without spaces. Use hyphens instead.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!name.trim() || name === channel?.name}>
              Rename Channel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// Delete Channel Modal
export function DeleteChannelModal({ open, onOpenChange, onConfirm, workspaceId, channel }: DeleteChannelModalProps) {
  const handleConfirm = () => {
    if (channel) {
      onConfirm({ id: channel.id, workspaceId })
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Channel</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the channel "#{channel?.name}"? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={handleConfirm}>
            Delete Channel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

