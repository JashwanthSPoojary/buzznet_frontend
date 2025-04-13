import { authenticated } from "@/lib/authenticated";
import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedrouteProps {
    children: React.ReactElement;
}

const Protectedroute = ({children}:ProtectedrouteProps) => {
    if(authenticated()){
        return children

    }
    return <Navigate to='/signin'/>
}
 
export default Protectedroute;