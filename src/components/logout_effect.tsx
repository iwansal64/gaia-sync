import { useEffect } from "react";
import { API } from "../utils/api_interface";

export default function LogoutEffect() {
  useEffect(() => {
    API.logout().then(() => {
      window.location.href = "/gate/login";
    }).catch(() => {
      alert("There's something wrong when logout!");
      window.location.href = "/";
    })
  }, []);
  
  return <></>;
}