import "react";
import { onLoginPressed, useLoginHooks } from "../../hooks/gate_hooks/useLoginHooks";
import { useUserDataHooks } from "../../hooks/user_hooks/useUserDataHooks";
import { resetAllStorageState } from "../../utils/state_manager";
import { useDeviceDataHooks } from "../../hooks/device_hooks/useDeviceDataHooks";


export default function LoginButton() {
  const { username, password } = useLoginHooks();
  const { setUserId, setAccessToken } = useUserDataHooks();
  const { setDeviceId } = useDeviceDataHooks();
  
  const handleLogin = async () => {
    const result = await onLoginPressed(username, password);
    if(result) {
      resetAllStorageState();
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