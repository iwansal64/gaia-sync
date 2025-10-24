import { create } from "zustand";

type ChatbotInputMessageType = {
      chatbotInputMessage: string,
      setChatbotInputMessage: (newChatbotInputMessage: string) => void;

      isChatbotProcess: boolean,
      setChatbotProcess: (newState: boolean) => void,

      isChatbotInputMessageFocused: boolean,
      setChatbotInputMessageFocused: (newState: boolean) => void,
};

export const useChatbotInputMessageHooks = create<ChatbotInputMessageType>((set) => ({
      chatbotInputMessage: "",
      setChatbotInputMessage(newChatbotInputMessage) {
            set(() => ({
                  chatbotInputMessage: newChatbotInputMessage
            }));
      },

      isChatbotProcess: false,
      setChatbotProcess(newState) {
          set(() => ({
            isChatbotProcess: newState
          }))
      },

      isChatbotInputMessageFocused: false,
      setChatbotInputMessageFocused(newState) {
          set(() => ({
            isChatbotInputMessageFocused: newState
          }));
      },
}));