import { useEffect } from "react";
import { API } from "../../utils/api_interface";

export default function LoginRequired() {
  useEffect(() => {
    API.is_authorized().then(authorized => {
      if(!authorized) {
        window.location.href = "/gate/login";
      }
    });
  });
  
  return <></>;
}