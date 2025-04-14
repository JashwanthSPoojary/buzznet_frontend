import { useEffect, useState } from "react";
import { ArrowRight, Check, Loader2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { token } from "@/lib/authenticated";
import { api } from "@/lib/api";

export default function InvitePage() {
  const { invitetoken } = useParams();
  const navigate = useNavigate();
  const [joined, setJoined] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await api.post(
        `/user/invite/${invitetoken}/accept`,
        {},
        { headers: { token: token } }
      );
      if (response.data.error) {
        setError(response.data.error || "Failed to join workspace");
        return;
      }
      const res = await api.get('/user/fetchIds',{
        headers:{
            token
        }
    });
      setJoined(true);
      navigate(
        `/workspace/${res.data.workspaceId}/channel/${res.data.channelId}`,
        { replace: true }
      );
    } catch (error) {
      console.log(error);
      setError("Failed to join workspace");
    }
  };

  const firstLetter = name.charAt(0);

  useEffect(() => {
    const fetchInviteDetails = async () => {
      if (!token) {
        navigate(`/signin?redirect=/invite/${invitetoken}`);
        return;
      }
      try {
        const response = await api.get(`/user/invite/${invitetoken}`, {
          headers: { token: token },
        });
        if (response.data.error) {
          setError(response.data.error || "Invalid invite.");
          setLoading(false);
          return;
        }
        setName(response.data.data);
      } catch (error) {
        setError("Server error");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchInviteDetails();
  }, [navigate, invitetoken]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center px-4">
        <Loader2 className="w-16 h-16 animate-spin text-gray-500 sm:w-20 sm:h-20" />
        <p className="text-lg sm:text-xl text-gray-500 mt-4">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center px-4">
        <p className="text-4xl sm:text-6xl font-bold text-red-500">{error}</p>
        <div className="mt-6 w-full flex justify-center">
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm justify-center">
            <Button
              onClick={() => navigate("/")}
              className="px-6 py-3 text-lg w-full sm:w-auto"
            >
              Go Home
            </Button>
          </div>
        </div>
      </div>
    );

  return (
    <div className="flex min-h-screen items-center justify-center p-4 md:p-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
              <Users className="h-5 w-5 text-secondary-foreground" />
            </div>
            <CardTitle className="text-xl">Workspace Invitation</CardTitle>
          </div>
          <CardDescription className="pt-2">
            You&apos;ve been invited to join the workspace
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-md bg-muted text-2xl font-semibold text-muted-foreground">
                {firstLetter}
              </div>
              <div>
                <h3 className="font-medium">{name}</h3>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button className="w-full" onClick={handleSubmit} disabled={joined}>
            {joined ? (
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4" />
                Joined Successfully
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Join Workspace
                <ArrowRight className="h-4 w-4" />
              </span>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
