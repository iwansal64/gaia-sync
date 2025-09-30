import { useEffect } from "react";
import { API } from "../utils/api_interface";
import { useConnectionHooks } from "../hooks/useConnectionHooks";

export default function LogoutEffect() {
  const { clearLoginInfo } = useConnectionHooks();
  
  useEffect(() => {
    clearLoginInfo();
    
    API.logout().then(() => {
      window.location.href = "/gate/login";
    }).catch(() => {
      alert("There's something wrong when logout!");
      window.location.href = "/";
    })
  }, []);
  
  return <></>;
}