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

const InviteModal = ({inviteModal,setInviteModal}:{inviteModal:boolean,setInviteModal:React.Dispatch<React.SetStateAction<boolean>>}) => {
  const { selectedWorkspace } = useWorkspaceStore();
  const [inviteLink, setInviteLink] = useState("");

  const copyInviteLink = () => {
    navigator.clipboard
      .writeText(inviteLink)
      .then(() => console.log("Invitation copied"))
      .catch(() => console.log("Failed to copy"))
  };

  const handleSubmit = async () => {
    try {
      const response = await api.post(
        `/workspace/${selectedWorkspace}/invite`,
        {},
        { headers: { token: token } }
      );
      setInviteLink(response.data.data);
      console.log("invitation generated");
    } catch (error) {
      console.log("Failed to generate");
      console.error(error);
    }
  };

  return (
    <Dialog open={inviteModal} onOpenChange={setInviteModal}>
      <DialogContent className="sm:max-w-[500px] ">
        <DialogHeader>
          <DialogTitle className="text-white">Invite Members</DialogTitle>
          <DialogDescription className="text-gray-400">
            Generate a link to invite members to this workspace.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="invite-link" className="text-[#b9bbbe]">Invite Link</Label>
            <div className="relative">
              <Input
                id="invite-link"
                value={inviteLink}
                readOnly
                onClick={copyInviteLink}
                className="pr-10 bg-[#192e4a] text-[#dcddde] placeholder-[#72767d] border border-[#040405] focus:ring-[#3ba55c]"
                placeholder="Generate an invite link"
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={copyInviteLink}
              >
                <ClipboardSignature className="text-gray-400" size={16} />
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setInviteModal(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!!inviteLink}>
            Generate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
