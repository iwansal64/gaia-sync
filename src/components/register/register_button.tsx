import "react";
import { onRegisterPressed, useRegisterHooks } from "../../hooks/useRegisterHooks";


export default function RegisterButton() {
  const { newEmail } = useRegisterHooks();
  
  const handleRegister = async () => {
    const result = await onRegisterPressed(newEmail);
    if(result) {
      setTimeout(() => window.location.href = "/gate/register/verify_email", 1000);
    }
  }
  
  return <>
    <button onClick={handleRegister} className="border border-black w-full h-fit py-4 rounded-full mt-10 cursor-pointer active:bg-green-600 active:text-white">Register</button>
  </>;
}