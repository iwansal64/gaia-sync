import "react";
import { onLoginPressed, useLoginHooks } from "../../hooks/useLoginHooks";
import { useUserDataHooks } from "../../hooks/useUserDataHooks";


export default function LoginButton() {
  const { username, password } = useLoginHooks();
  const { setUserId, setAccessToken, setDeviceId } = useUserDataHooks();
  
  const handleLogin = async () => {
    const result = await onLoginPressed(username, password);
    if(result) {
      console.log(result);
      setUserId(result["id"]);
      setDeviceId(result["device_token"]);
      setAccessToken(result["access_token"]);
      setTimeout(() => window.location.href = "/", 1000);
    }
  }
  
  return <>
    <button onClick={handleLogin} className="border border-black w-full h-fit py-4 rounded-full mt-10 cursor-pointer active:bg-green-600 active:text-white">Login</button>
  </>;
}