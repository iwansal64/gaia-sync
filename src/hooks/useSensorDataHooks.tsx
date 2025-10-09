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
    set((state) => ({
      ...state,
      ...newData
    }))
  },
}));

export default function UseSensorDataHooksEffect() {
  const { ec, tds, setWaterQuality } = useSensorDataHooks();
  
  useEffect(() => {
    if(!ec || !tds) return;

    if(ec < 3 && tds < 500) {
      setWaterQuality("Good");
    }
    else {
      setWaterQuality("Poor");
    }
  }, [ec, tds]);
  
  return <></>;
}
