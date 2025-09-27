import "react";
import { onLoginPressed, useLoginHooks } from "../../../hooks/useLoginHooks";


export default function LoginButton() {
  const { username, password } = useLoginHooks();
  
  const handleLogin = async () => {
    const result = await onLoginPressed(username, password);
    if(result) setTimeout(() => window.location.href = "/", 1000);
  }
  
  return <>
    <button onClick={handleLogin} className="border border-black w-full h-fit py-4 rounded-full mt-10 cursor-pointer active:bg-green-600 active:text-white">Login</button>
  </>;
}