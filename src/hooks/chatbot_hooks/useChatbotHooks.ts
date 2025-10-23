import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


type ChatbotHookstype = {
  deviceIdContext?: string,
  setDeviceIdContext: (newDeviceId: string) => void,
};

export const useChatbotHooks = create<ChatbotHookstype>()(
  persist(
    (set) => ({
      deviceIdContext: "",
      setDeviceIdContext(newDeviceId) {
        set(() => ({
          deviceIdContext: newDeviceId
        }));
      },
    }),
    {
      name: "gaia-chatbot-data",
      storage: createJSONStorage(() => sessionStorage)
    }
))