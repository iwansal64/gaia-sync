import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { type AccessedModelDeviceType } from '../../lib/model';
import { useEffect } from "react";
import { API } from "../../utils/api_interface";

type IndexedDevicesDataType = {
  [key: string]: AccessedModelDeviceType
};

type DeviceDataHookstype = {
  deviceId?: string,
  setDeviceId: (newDeviceId: string) => void,

  devicesData?: AccessedModelDeviceType[],
  setDevicesData: (newDevicesData: AccessedModelDeviceType[]) => void

  indexedDevicesData?: IndexedDevicesDataType,
};

export const useDeviceDataHooks = create<DeviceDataHookstype>()(
  persist(
    (set) => ({
      deviceId: "",
      setDeviceId(newDeviceId) {
        set(() => ({
          deviceId: newDeviceId
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

export default function UseDeviceDataHooksEffect() {
  const { setDevicesData } = useDeviceDataHooks();

  const initialize = async () => {
    await useDeviceDataHooks.persist.rehydrate();
    if(useDeviceDataHooks.getState().devicesData !== undefined) return;
    

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
  