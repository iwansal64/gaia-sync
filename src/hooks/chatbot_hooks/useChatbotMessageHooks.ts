import { create } from "zustand";

export type ChatbotMessageType = {
      message: string,
      timestamp: Date,
      from_user: boolean,
}

type ChatbotMessageHooksType = {
      messages: ChatbotMessageType[] | null,
      setMessages: (new_messages: ChatbotMessageType[]) => void,
}

export const useChatbotMessageHooks = create<ChatbotMessageHooksType>(
      (set) => ({
            messages: null,
            setMessages(new_messages) {
                  set(() => ({
                  messages: new_messages
                  }));
            },
      })
);