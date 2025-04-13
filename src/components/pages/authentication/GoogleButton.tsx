import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { GoogleIcon } from "@/components/pages/authentication/GoogleIcon";
import env from "@/lib/config";

export default function GoogleAuth() {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = () => {
    setLoading(true);
    console.log(env.backend_url);
    try {
      window.location.href = `${env.backend_url}/user/google`;
    } catch (error) {
      console.log("what is the error : ",error);
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center bg-transparent">
      <Button
        onClick={handleGoogleLogin}
        className="cursor-pointer flex items-center justify-center gap-6 px-12 py-6 text-2xl font-bold border-2 border-gray-300 rounded-2xl shadow-lg bg-foreground hover:bg-foreground/90 transition-all duration-300"
      >
        {loading ? (
          <Loader className="w-10 h-10 animate-spin text-background" />
        ) : (
          <GoogleIcon className="w-10 h-10" />
        )}
        {loading ? "Signing in..." : "Sign in with Google"}
      </Button>
    </div>
  );
}
