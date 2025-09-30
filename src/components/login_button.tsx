import "react";
import { onLoginPressed, useLoginHooks } from "../hooks/useLoginHooks";
import UseConnectionHooksEffect, { useConnectionHooks } from "../hooks/useConnectionHooks";


export default function LoginButton() {
  const { username, password } = useLoginHooks();
  const { setUserId, setAccessToken } = useConnectionHooks();
  
  const handleLogin = async () => {
    const result = await onLoginPressed(username, password);
    if(result) {
      setUserId(result["id"]);
      setAccessToken(result["access_token"]);
      setTimeout(() => window.location.href = "/", 1000);
    }
  }
  
  return <>
    <UseConnectionHooksEffect />
    <button onClick={handleLogin} className="border border-black w-full h-fit py-4 rounded-full mt-10 cursor-pointer active:bg-green-600 active:text-white">Login</button>
  </>;
}