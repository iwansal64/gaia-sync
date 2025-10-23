import { useEffect, useRef } from "react";
import { useChatbotInputMessageHooks } from "../../hooks/chatbot_hooks/useChatbotInputMessageHooks";

export default function ChatbotChatInputMessage() {
      const chatbotInputElement = useRef<HTMLInputElement | null>(null);
      const { chatbotInputMessage, setChatbotInputMessage, isChatbotProcess, setChatbotInputMessageFocused } = useChatbotInputMessageHooks();

      const setFocus = () => {
            setChatbotInputMessageFocused(true);
      }

      const setUnfocus = () => {
            setChatbotInputMessageFocused(false);
      }
      
      useEffect(() => {
            if(!chatbotInputElement.current) return;

            chatbotInputElement.current.addEventListener("focusin", setFocus);
            chatbotInputElement.current.addEventListener("focusout", setUnfocus);
            
            return () => {
                  if(!chatbotInputElement.current) return;

                  chatbotInputElement.current.removeEventListener("focusin", setFocus);
                  chatbotInputElement.current.removeEventListener("focusout", setUnfocus);
            }
      }, [chatbotInputElement]);

      return <input className={`p-4 bg-gray-600 text-white w-full rounded-full font-semibold ${isChatbotProcess && "opacity-50 pointer-events-none"}`} placeholder="Chat here.." value={chatbotInputMessage} onChange={(e) => setChatbotInputMessage(e.target.value)} ref={chatbotInputElement}></input>;
}