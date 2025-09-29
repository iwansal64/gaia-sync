import { useEffect } from "react";
import { create } from "zustand";


type Data = {
  ec?: number,
  tds?: number,

  tempC?: number,

  ph?: number,
}

type UseDataHookType = Data & {
  waterQuality?: string,

  setWaterQuality: (newState: string) => void,
  setData: (newData: Data) => void,
};

export const useDataHooks = create<UseDataHookType>((set) => ({
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

export default function UseDataHooksEffect() {
  const { ec, tds, setWaterQuality } = useDataHooks();
  
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
