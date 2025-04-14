import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GoogleAuthStatus from "./GoogleAuthStatus";
import { api } from "@/lib/api";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);

  useEffect(() => {
    const processAuth = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get("token");
        const error = queryParams.get("error");
        if (error) {
          setError("Authentication failed: " + error);
          return;
        }
        if (!token) {
          setError("No authentication token received");
          return;
        }
        localStorage.setItem("buzznettoken", token);
        const res = await api.get('/user/fetchIds',{
            headers:{
                token
            }
        });
        if(res.status!==200){
            setError("Unauthorized to proceed");
            return
        }
        console.log("setting the token");
        if(res.status==200) {
          window.location.href = `/workspace/${res.data.workspaceId}/channel/${res.data.channelId}`;
        }
      } catch (err) {
        setError("Authentication processing failed");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    processAuth();
  }, [location, navigate]);

  return <GoogleAuthStatus isLoading={isLoading} error={error}/>
};

export default GoogleCallback;