import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


type UseUserDataType = {
  userId?: string,
  setUserId: (newUserId: string) => void,

  accessToken?: string,
  setAccessToken: (newAccessToken: string) => void,

  clearLoginInfo: () => void
};

export const useUserDataHooks = create<UseUserDataType>()(
  persist(
    (set) => ({
      userId: "",

      setUserId(newClientId) {
        set(() => ({
          userId: newClientId
        }));    
      }, 

      accessToken: "",

      setAccessToken(newAccessToken) {
        set(() => ({
          accessToken: newAccessToken
        }));
      },

      clearLoginInfo() {
        set(() => ({
          accessToken: "",
          userId: ""
        }));
      },
    }),
    {
      name: "gaia-connection-data",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ userId: state.userId, accessToken: state.accessToken }),
    }
))

export default function UseUserDataHooksEffect() {
  return <></>;
}
  