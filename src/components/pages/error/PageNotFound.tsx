import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
const PageNotFound = () => {
  const router = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl text-gray-500 mt-2">Oops! Page not found.</p>
      
      <div className="mt-6 flex gap-4">
        <Button onClick={() => router("/")} className="px-6 py-3 text-lg">
          Go Home
        </Button>
        <Button onClick={() => router("/signin")} variant="outline" className="px-6 py-3 text-lg">
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default PageNotFound;
