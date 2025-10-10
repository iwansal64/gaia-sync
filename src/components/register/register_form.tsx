import "react";
import { useRegisterHooks } from "../../hooks/useRegisterHooks";

export default function LoginForm() {
  const { setNewEmail } = useRegisterHooks();
  
  return <>
    <input onChange={(e) => setNewEmail(e.target.value)} placeholder="Email address" id="email" type="text" className="bg-transparent border border-black p-4 rounded-full" />
  </>;
}