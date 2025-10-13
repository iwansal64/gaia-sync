import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { type AccessedModelDeviceType } from '../lib/model';
import { useEffect } from "react";
import { API } from "../utils/api_interface";


type UseUserDataType = {
  userId?: string,
  setUserId: (newUserId: string) => void,

  deviceId?: string,
  setDeviceId: (newDeviceId: string) => void,

  devicesData?: AccessedModelDeviceType[],
  setDevicesData: (newDevicesData: AccessedModelDeviceType[]) => void

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

      devicesData: undefined,
      setDevicesData(newDevicesData) {
        set(() => ({
          devicesData: newDevicesData
        }));
      },
    }),
    {
      name: "gaia-connection-data",
      storage: createJSONStorage(() => sessionStorage)
    }
))

export default function UseUserDataHooksEffect() {
  const { devicesData, userId, accessToken, setDevicesData } = useUserDataHooks();

  useEffect(() => {
    console.log("GET DEVCE");
    if(!devicesData) {
      API.get_devices().then((data) => {
        
      });
    }
  }, []);
  
  return <></>;
}
  