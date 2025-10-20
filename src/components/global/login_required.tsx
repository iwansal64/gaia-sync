import { useEffect } from "react";
import { API } from "../../utils/api_interface";
import { useUserDataHooks } from "../../hooks/user_hooks/useUserDataHooks";

export default function LoginRequired() {
  const { accessToken, setAccessToken } = useUserDataHooks();
  
  useEffect(() => {
    API.is_authorized().then(([authorized, access_token]) => {
      if(!authorized) {
        window.location.href = "/gate/login";
        return;
      }

      if(access_token && !accessToken) {
        setAccessToken(access_token);
      }
    });
  });
  
  return <></>;
}