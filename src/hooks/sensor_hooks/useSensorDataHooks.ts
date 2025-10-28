import { useEffect } from "react";
import { create } from "zustand";


type SensorData = {
  ec?: number,
  tds?: number,

  tempC?: number,

  ph?: number,
}

type UseSensorDataHookType = SensorData & {
  waterQuality?: string,

  setWaterQuality: (newState: string) => void,
  setData: (newData: SensorData) => void,
};

export const useSensorDataHooks = create<UseSensorDataHookType>((set) => ({
  setWaterQuality(newState) {
    set(() => ({
      waterQuality: newState
    }));
  },
  
  setData(newData) {
    if(newData.ec && newData.ec < 0) {
      newData = {
        ...newData,
        ec: 100
      }
    }
    set((state) => ({
      ...state,
      ...newData
    }))
  },
}));