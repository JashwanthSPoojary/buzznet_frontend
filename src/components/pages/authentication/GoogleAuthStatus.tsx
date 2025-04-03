import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const GoogleAuthStatus = ({ isLoading, error }: { isLoading: boolean; error?: string | null }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      {isLoading ? (
        <>
          <Loader2 className="w-16 h-16 animate-spin text-gray-500 sm:w-20 sm:h-20" />
          <p className="text-lg sm:text-xl text-gray-500 mt-4">Processing authentication...</p>
        </>
      ) : error ? (
        <>
          <p className="text-4xl sm:text-6xl font-bold text-red-500">Authentication Failed</p>
          <p className="text-base sm:text-xl text-gray-500 mt-2">{error}</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 w-full max-w-sm">
            <Button onClick={() => navigate("/")} className="px-6 py-3 text-lg w-full sm:w-auto">
              Go Home
            </Button>
            <Button onClick={() => navigate("/signin")} variant="outline" className="px-6 py-3 text-lg w-full sm:w-auto">
              Try Again
            </Button>
          </div>
        </>
      ) : (
        <>
          <p className="text-4xl sm:text-6xl font-bold text-green-500">Success!</p>
          <p className="text-lg sm:text-xl text-gray-500 mt-2">Redirecting...</p>
        </>
      )}
    </div>
  );
};

export default GoogleAuthStatus;
