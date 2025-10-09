import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


type UseUserDataType = {
  userId?: string,
  setUserId: (newUserId: string) => void,

  deviceId?: string,
  setDeviceId: (newDeviceId: string) => void,

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

      deviceId: "",

      setDeviceId(newDeviceId) {
        set(() => ({
          deviceId: newDeviceId
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
      storage: createJSONStorage(() => sessionStorage)
    }
))

export default function UseUserDataHooksEffect() {
  return <></>;
}
  