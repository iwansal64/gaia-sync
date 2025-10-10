import "react";
import { onCreateUser, useRegisterHooks } from "../../hooks/useRegisterHooks";


export default function CreateUserButton() {
  const { newUsername, newPassword } = useRegisterHooks();
  
  const handleLogin = async () => {
    const result = await onCreateUser(newUsername, newPassword);
    if(result) {
      setTimeout(() => window.location.href = "/gate/login", 1000);
    }
  }
  
  return <>
    <button onClick={handleLogin} className="border border-black w-full h-fit py-4 rounded-full mt-10 cursor-pointer active:bg-green-600 active:text-white">Login</button>
  </>;
}