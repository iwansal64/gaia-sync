import "react";
import { useRegisterHooks } from "../../hooks/useRegisterHooks";

export default function CreateUserForm() {
  const { setNewUsername, setNewPassword } = useRegisterHooks();
  
  return <>
    <input onChange={(e) => setNewUsername(e.target.value)} placeholder="create username" id="username" type="text" className="bg-transparent border border-black p-4 rounded-full" />
    <input onChange={(e) => setNewPassword(e.target.value)} placeholder="create password" id="password" type="password" className="bg-transparent border border-black p-4 rounded-full" />
  </>;
}