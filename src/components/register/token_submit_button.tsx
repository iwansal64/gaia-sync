import "react";
import { useRegisterHooks, onVerifyPressed } from "../../hooks/useRegisterHooks";

export default function TokenSubmitButton() {
  const { verificationToken } = useRegisterHooks();
  
  const handleVerify = async () => {
    const result = await onVerifyPressed(verificationToken);
    if(result) {
      setTimeout(() => window.location.href = "/gate/register/create", 1000);
    }
  }
  
  return <>
    <button onClick={handleVerify} className="border border-black w-full h-fit py-4 rounded-full mt-10 cursor-pointer active:bg-green-600 active:text-white">Verify</button>
  </>;
}