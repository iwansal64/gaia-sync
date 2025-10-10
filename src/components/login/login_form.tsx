import "react";
import { useLoginHooks } from "../../hooks/useLoginHooks";

export default function LoginForm() {
  const { setUsername, setPassword } = useLoginHooks();
  
  return <>
    <input onChange={(e) => setUsername(e.target.value)} placeholder="username" id="username" type="text" className="bg-transparent border border-black p-4 rounded-full" />
    <input onChange={(e) => setPassword(e.target.value)} placeholder="password" id="password" type="password" className="bg-transparent border border-black p-4 rounded-full" />
  </>;
}