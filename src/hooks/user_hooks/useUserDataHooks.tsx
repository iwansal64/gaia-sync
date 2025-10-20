import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { type AccessedModelDeviceType } from '../../lib/model';
import { useEffect } from "react";
import { API } from "../../utils/api_interface";

type IndexedDevicesDataType = {
  [key: string]: AccessedModelDeviceType
};

type UseUserDataType = {
  userId?: string,
  setUserId: (newUserId: string) => void,

  deviceId?: string,
  setDeviceId: (newDeviceId: string) => void,

  devicesData?: AccessedModelDeviceType[],
  setDevicesData: (newDevicesData: AccessedModelDeviceType[]) => void

  indexedDevicesData?: IndexedDevicesDataType,

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
        let indexedDevicesDataValue: IndexedDevicesDataType = {};

        newDevicesData.forEach((deviceData) => {
          indexedDevicesDataValue[deviceData.id] = deviceData;
        });
        
        set(() => ({
          devicesData: newDevicesData,
          indexedDevicesData: indexedDevicesDataValue
        }));
      },

      indexedDevicesData: {},
    }),
    {
      name: "gaia-connection-data",
      storage: createJSONStorage(() => sessionStorage)
    }
))

let initialized = false;

export default function UseUserDataHooksEffect() {
  const { setDevicesData } = useUserDataHooks();

  const initialize = async () => {
    await useUserDataHooks.persist.rehydrate();
    if(useUserDataHooks.getState().devicesData !== undefined) return;
    

    API.get_devices().then((data) => {
      // If the data empty or there's an error
      if(!data) return;
      
      // Update devices data
      setDevicesData(data);
    });
    
    initialized = true;
  }
  

  useEffect(() => {
    if(!initialized) initialize();
  }, []);
  
  return <></>;
}
  