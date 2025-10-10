import { useEffect } from "react";
import { useRegisterHooks } from "../../hooks/useRegisterHooks";

export default function InputTokenForm() {
  const { setVerificationToken, verificationToken } = useRegisterHooks();

  useEffect(() => {
    document.addEventListener('paste', function (event) {
      const pastedText = event.clipboardData?.getData('text') ?? "";
      if(pastedText.length == 5) {
        setVerificationToken(pastedText);
      }
    });
  }, []);
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const character = event.target.value.charAt(event.target.value.length-1);
    
    if(verificationToken.length > index) {
      let result = verificationToken.split("");
      result[index] = character;
      setVerificationToken(result.join(""));
    }
    else if(verificationToken.length == index) {
      setVerificationToken(verificationToken+character);
    }
  }

  return <>
    <div className="w-full h-fit py-8 flex flex-row gap-4 justify-center items-center">
      <input type="text" id="verification-token-1" className="p-6 text-2xl w-full border-1 text-black!" maxLength={2} value={verificationToken.length >= 1 ? verificationToken.charAt(0) : " "} onChange={(e) => handleChange(e, 0)} />
      <input type="text" id="verification-token-2" className="p-6 text-2xl w-full border-1 text-black!" maxLength={2} value={verificationToken.length >= 2 ? verificationToken.charAt(1) : " "} onChange={(e) => handleChange(e, 1)} />
      <input type="text" id="verification-token-3" className="p-6 text-2xl w-full border-1 text-black!" maxLength={2} value={verificationToken.length >= 3 ? verificationToken.charAt(2) : " "} onChange={(e) => handleChange(e, 2)} />
      <input type="text" id="verification-token-4" className="p-6 text-2xl w-full border-1 text-black!" maxLength={2} value={verificationToken.length >= 4 ? verificationToken.charAt(3) : " "} onChange={(e) => handleChange(e, 3)} />
      <input type="text" id="verification-token-5" className="p-6 text-2xl w-full border-1 text-black!" maxLength={2} value={verificationToken.length >= 5 ? verificationToken.charAt(4) : " "} onChange={(e) => handleChange(e, 4)} />
    </div>
  </>;
}