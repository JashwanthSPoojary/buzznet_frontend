import { ArrowLeft, Mic, MicOff, Phone, Video, VideoOff } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMemberStore } from "@/store/slices/member-store";
import { useLocalMediaStream } from "@/hooks/useLocalStream";
import { useCallStore } from "@/store/slices/call-store";
import { useEffect, useRef, useState } from "react";
import { useWebsocketStore } from "@/store/slices/ws-store";
import { useNavigate } from "react-router-dom";
import { useWorkspaceStore } from "@/store";

export function VideoCall() {
  const { localStream, getLocalStream } = useLocalMediaStream();
  const { peerInstance, isInCall, setIsInCall, incomingCall } = useCallStore();
  const selectedMember = useMemberStore((state) => state.selectedMember);
  const ws = useWebsocketStore((state) => state.ws);

  const [receiverId, setReceiverId] = useState<string | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const navigate = useNavigate();
  const selectedWorkspace = useWorkspaceStore(
    (state) => state.selectedWorkspace
  );

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const memberName = useMemberStore(
    (state) => state.getCurrentMember()?.username
  );

  const startCall = async () => {
    try {
      console.log("Starting call with peer:", peerInstance?.id);
      console.log("To receiver:", receiverId);
      setIsVideoOff(false);

      const peer = peerInstance;
      console.log(peer);

      if (!peer) {
        throw new Error("Peer connection not initialized");
      }
      let stream = localStream;
      if (!stream) {
        stream = await getLocalStream();
      }
      if (localVideoRef.current && stream) {
        localVideoRef.current.srcObject = stream;
      } else {
        throw new Error("Local stream not available");
      }
      if (!receiverId) {
        throw new Error("Receiver ID not provided");
      }

      const outgoingCall = peer.call(receiverId, stream);
      console.log("Outgoing call created:", outgoingCall);
      if (!outgoingCall) {
        throw new Error("Failed to initiate call");
      }

      outgoingCall.on("stream", (remoteStream) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
        }
      });

      outgoingCall.on("error", (error) => {
        console.error("Call error:", error);
        // Handle call errors
      });

      setIsInCall(true);
    } catch (error) {
      console.error("Call failed:", error);
      // Show user-friendly error message
      setIsInCall(false);
      setIsVideoOff(true);
    }
  };

  const toggleMute = () => {
    if (localVideoRef.current?.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    }
  };

  const toggleVideo = () => {
    if (localVideoRef.current?.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOff(!videoTrack.enabled);
      }
    }
  };

  const handleCancel = async () => {
    if (localVideoRef.current?.srcObject) {
      const localStream = localVideoRef.current.srcObject as MediaStream;
      localStream.getTracks().forEach((track) => track.stop());
      localVideoRef.current.srcObject = null;
    }

    if (remoteVideoRef.current?.srcObject) {
      const remoteStream = remoteVideoRef.current.srcObject as MediaStream;
      remoteStream.getTracks().forEach((track) => track.stop());
      remoteVideoRef.current.srcObject = null;
    }

    setIsInCall(false);
    setIsVideoOff(true);
    setIsMuted(false);
    navigate(`/workspace/${selectedWorkspace}/dm/${selectedMember}`);
  };

  useEffect(() => {
    const peer = peerInstance;

    if (!peer || !ws || !selectedMember) return;

    const handleOpen = () => {
      console.log("request peer id is sent");
      ws.send(
        JSON.stringify({
          type: "request-peer-id",
          targetVideoUserId: selectedMember,
        })
      );
    };

    if (ws.readyState === WebSocket.OPEN) {
      console.log("initial request peer id is sent");
      handleOpen();
    } else {
      ws.addEventListener("open", handleOpen);
    }

    const handleMessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data);
      if (message.type === "response-peer-id") {
        console.log("response peer got ", message.videoPeerId);
        setReceiverId(message.videoPeerId);
      }
    };

    ws.addEventListener("message", handleMessage);

    if (isInCall) {
      const startReceiveCall = async () => {
        try {
          let stream = localStream;
          if (!stream) {
            stream = await getLocalStream();
          }

          if (localVideoRef.current && stream) {
            localVideoRef.current.srcObject = stream;
          } else {
            throw new Error("Local stream not available for answering call");
          }

          incomingCall?.answer(stream);
          incomingCall?.on("stream", (remoteStream) => {
            remoteStream.getVideoTracks().forEach((track) => {
              console.log("Video Track Enabled:", track.enabled);
              console.log("Video Track Muted:", track.muted);
            });
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = remoteStream;
              remoteVideoRef.current.muted = false; // Force unmute
              setTimeout(() => {
                remoteVideoRef.current?.play().catch((err) => console.error("Error playing video:", err));
              }, 500);
            }
          });
        } catch (error) {
          console.error("Error during incoming call handling: ", error);
        }
      };

      startReceiveCall();
    }

    return () => {
      ws.removeEventListener("open", handleOpen);
      ws.removeEventListener("message", handleMessage);
      // peer.destroy();
    };
  }, [selectedMember, peerInstance, ws, isInCall, incomingCall]);

  return (
    <div className="flex h-full flex-col">
      {/* Call header */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b px-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCancel}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to chat</span>
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarFallback>{memberName?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-lg font-semibold">{memberName}</h1>
          </div>
        </div>
      </div>

      {/* Video call area */}
      <div className="relative flex flex-1 flex-col bg-black">
        {/* Main video (recipient) - remote video stream */}
        <div className="flex h-full w-full items-center justify-center">
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="h-full w-full object-cover"
          />
          {!isInCall && (
            <div className="absolute flex flex-col items-center justify-center">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarFallback className="text-4xl">
                  {memberName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-white text-xl">{memberName}</h2>
              { !isInCall && (
                <Button 
                  onClick={startCall}
                  className="mt-4"
                  variant="secondary"
                >
                  Start Call
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Self video (picture-in-picture) */}
        <div className="absolute bottom-24 right-4 h-48 w-64 overflow-hidden rounded-lg border-2 border-background bg-zinc-900 shadow-lg">
          {isVideoOff ? (
            <div className="flex h-full w-full items-center justify-center bg-zinc-800">
              <Avatar className="h-16 w-16">
                <AvatarFallback>
                  {useMemberStore.getState().getCurrentMember()?.username?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
            </div>
          ) : (
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="h-full w-full object-cover"
            />
          )}
        </div>

        {/* Call controls */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-4 bg-background/10 p-4 backdrop-blur-sm">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={isMuted ? "destructive" : "secondary"}
                  size="icon"
                  className="h-12 w-12 rounded-full"
                  onClick={toggleMute}
                >
                  {isMuted ? (
                    <MicOff className="h-5 w-5" />
                  ) : (
                    <Mic className="h-5 w-5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{isMuted ? "Unmute" : "Mute"}</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={isVideoOff ? "destructive" : "secondary"}
                  size="icon"
                  className="h-12 w-12 rounded-full"
                  onClick={toggleVideo}
                >
                  {isVideoOff ? (
                    <VideoOff className="h-5 w-5" />
                  ) : (
                    <Video className="h-5 w-5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isVideoOff ? "Turn on camera" : "Turn off camera"}
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="destructive"
                  size="icon"
                  className="h-12 w-12 rounded-full"
                  onClick={handleCancel}
                >
                  <Phone className="h-5 w-5 rotate-135" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>End call</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}