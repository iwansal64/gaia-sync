import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


type ChatbotPageHookstype = {
  deviceIdContext?: string,
  setDeviceIdContext: (newDeviceId: string) => void,

  hasHydrated: boolean,
  setHasHydrated: () => void,
};

export const useChatbotPageHooks = create<ChatbotPageHookstype>()(
  persist(
    (set) => ({
      deviceIdContext: "",
      setDeviceIdContext(newDeviceId) {
        set(() => ({
          deviceIdContext: newDeviceId
        }));
      },

      hasHydrated: false,
      setHasHydrated() {
          set(() => ({
            hasHydrated: true
          }));
      },
    }),
    {
      name: "gaia-chatbot-data",
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage(state) {
        return (state, error) => {
          if(!error) state?.setHasHydrated();
        }
      },
    }
))