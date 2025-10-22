import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { type AccessedModelDeviceType } from '../../lib/model';

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