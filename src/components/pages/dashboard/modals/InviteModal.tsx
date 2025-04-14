import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWorkspaceStore } from "@/store";
import { useState } from "react";
import { api } from "@/lib/api";
import { token } from "@/lib/authenticated";
import { ClipboardSignature } from "lucide-react";

const InviteModal = ({
  inviteModal,
  setInviteModal
}: {
  inviteModal: boolean;
  setInviteModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { selectedWorkspace } = useWorkspaceStore();
  const [inviteLink, setInviteLink] = useState("");

  const copyInviteLink = () => {
    navigator.clipboard
      .writeText(inviteLink)
      .then(() => console.log("Invitation copied"))
      .catch(() => console.log("Failed to copy"));
  };

  const handleSubmit = async () => {
    try {
      const response = await api.post(
        `/workspace/${selectedWorkspace}/invite`,
        {},
        { headers: { token: token } }
      );
      setInviteLink(response.data.data);
      console.log("Invitation generated");
    } catch (error) {
      console.log("Failed to generate");
      console.error(error);
    }
  };

  return (
    <Dialog open={inviteModal} onOpenChange={setInviteModal}>
      <DialogContent
        className="sm:max-w-[500px]"
        style={{ background: "var(--color-card)", color: "var(--color-card-foreground)" }}
      >
        <DialogHeader>
          <DialogTitle className="text-[var(--color-primary)]">Invite Members</DialogTitle>
          <DialogDescription className="text-[var(--color-muted-foreground)]">
            Generate a link to invite members to this workspace.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="invite-link" className="text-[var(--color-muted-foreground)]">
              Invite Link
            </Label>
            <div className="relative">
              <Input
                id="invite-link"
                value={inviteLink}
                readOnly
                onClick={copyInviteLink}
                className="pr-10 border"
                style={{
                  background: "var(--color-input)",
                  color: "var(--color-foreground)",
                  borderColor: "var(--color-border)"
                }}
                placeholder="Generate an invite link"
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={copyInviteLink}
              >
                <ClipboardSignature
                  className="text-[var(--color-muted-foreground)]"
                  size={16}
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setInviteModal(false)}
            style={{
              background: "var(--color-muted)",
              color: "var(--color-muted-foreground)",
              borderColor: "var(--color-border)"
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!!inviteLink}
            style={{
              background: "var(--color-primary)",
              color: "var(--color-primary-foreground)"
            }}
          >
            Generate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
