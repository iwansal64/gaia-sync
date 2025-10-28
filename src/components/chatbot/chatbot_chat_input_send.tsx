import { IoIosSend } from "react-icons/io";
import { API, SendPromptResponseEnum } from "../../utils/api_interface";
import { useChatbotPageHooks } from "../../hooks/chatbot_hooks/useChatbotPageHooks";
import { useChatbotInputMessageHooks } from "../../hooks/chatbot_hooks/useChatbotInputMessageHooks";
import { useToastHooks } from "../../hooks/global_hooks/useToastHooks";
import { useEffect } from "react";
import { useChatbotMessageHooks } from "../../hooks/chatbot_hooks/useChatbotMessageHooks";

export default function ChatbotChatInputSend() {
      const { chatbotInputMessage, setChatbotInputMessage, isChatbotProcess, setChatbotProcess, isChatbotInputMessageFocused } = useChatbotInputMessageHooks();
      const { deviceIdContext } = useChatbotPageHooks();
      const { setMessages, messages } = useChatbotMessageHooks();
      const { showMessage } = useToastHooks();
      
      const handleSendMessage = async () => {
            if(!deviceIdContext || isChatbotProcess || chatbotInputMessage.length < 1 || messages === null) return;
            setChatbotInputMessage("");
            setChatbotProcess(true);

            const previousMessages = structuredClone(messages);

            const user_chat_date = new Date();
            setMessages([
                  ...previousMessages,
                  {
                        from_user: true,
                        message: chatbotInputMessage,
                        timestamp: user_chat_date
                  },
            ]);

            const result = await API.send_prompt(chatbotInputMessage, deviceIdContext);
            if(typeof result === "string") {
                  setMessages([
                        ...previousMessages,
                        {
                              from_user: true,
                              message: chatbotInputMessage,
                              timestamp: user_chat_date
                        },
                        {
                              from_user: false,
                              message: result,
                              timestamp: new Date()
                        },
                  ]);
            }
            else {
                  showMessage({ title: "There's an error!", timeout: 3000 });
            }

            setChatbotProcess(false);
      }

      const handleEnterKeypress = (ev: KeyboardEvent) => {
            if(!isChatbotInputMessageFocused) return;
            if(ev.key === "Enter") handleSendMessage();
      }

      useEffect(() => {
            window.addEventListener("keydown", handleEnterKeypress);

            return () => {
                  window.removeEventListener("keydown", handleEnterKeypress);
            }
      })

      return <div className={`p-4 h-fit! aspect-square flex justify-center items-center bg-gray-600 rounded-full hover:brightness-110 cursor-pointer ${isChatbotProcess && "opacity-50 pointer-events-none"}`} onClick={handleSendMessage}>
            <IoIosSend color="white" fontSize={24} />
      </div>;
}