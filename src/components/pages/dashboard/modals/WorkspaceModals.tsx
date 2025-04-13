
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

interface Owner {
  id: number;
  created_at: Date;
  username: string;
  email: string | null;
  password_hash: string;
}
interface Workspace {
  name: string;
  id: number;
  owner_id: number;
  owner: Owner;
}
// Types for the workspace modals
interface WorkspaceModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (data: any) => void
}

interface CreateWorkspaceModalProps extends WorkspaceModalProps {}

interface RenameWorkspaceModalProps extends WorkspaceModalProps {
  workspace: Workspace | undefined
}

interface DeleteWorkspaceModalProps extends WorkspaceModalProps {
  workspace: Workspace | undefined
}

// Create Workspace Modal
export function CreateWorkspaceModal({ open, onOpenChange, onConfirm }: CreateWorkspaceModalProps) {
  const [name, setName] = React.useState("");
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
    e.preventDefault();
    if (name.trim()) {
      onConfirm({name} , );
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Workspace</DialogTitle>
            <DialogDescription>Create a new workspace for your team.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="workspace-name">Workspace Name</Label>
              <Input
                id="workspace-name"
                ref={inputRef}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter workspace name"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!name.trim()}>
              Create Workspace
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// Rename Workspace Modal
export function RenameWorkspaceModal({ open, onOpenChange, onConfirm, workspace }: RenameWorkspaceModalProps) {
  const [name, setName] = React.useState(workspace?.name || "")
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Update name when workspace changes
  React.useEffect(() => {
    if (workspace) {
      setName(workspace.name)
    }
  }, [workspace])

  // Focus the input when the modal opens
  React.useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim() && workspace) {
      onConfirm({ id: workspace.id, name })
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Rename Workspace</DialogTitle>
            <DialogDescription>Change the name of your workspace.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="workspace-name">Workspace Name</Label>
              <Input
                id="workspace-name"
                ref={inputRef}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter workspace name"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!name.trim() || name === workspace?.name}>
              Rename Workspace
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// Delete Workspace Modal
export function DeleteWorkspaceModal({ open, onOpenChange, onConfirm, workspace }: DeleteWorkspaceModalProps) {
  const handleConfirm = () => {
    if (workspace) {
      onConfirm({ id: workspace.id })
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Workspace</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the workspace "{workspace?.name}"? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={handleConfirm}>
            Delete Workspace
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

