import "react";
import { onRegisterPressed, useRegisterHooks } from "../../hooks/gate_hooks/useRegisterHooks";
import { is_email_valid } from "../../utils/email_verifier";
import { useToastHooks } from "../../hooks/global_hooks/useToastHooks";


export default function RegisterButton() {
  const { newEmail } = useRegisterHooks();
  const { showMessage } = useToastHooks();
  
  const handleRegister = async () => {
    if(!is_email_valid(newEmail)) {
      showMessage({
        title: "Email is Invalid!",
        message: "Please check your email",
        timeout: 3000
      });
      return;
    }

    const result = await onRegisterPressed(newEmail);
    if(result) {
      setTimeout(() => window.location.href = "/gate/register/verify_email", 2000);
    }
  }
  
  return <>
    <button onClick={handleRegister} className="border border-black w-full h-fit py-4 rounded-full mt-10 cursor-pointer active:bg-green-600 active:text-white">Register</button>
  </>;
}