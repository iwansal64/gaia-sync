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
  const { ec, tds, setWaterQuality, setData } = useDataHooks();
  
  useEffect(() => {
    if(!ec || !tds) return;

    if(ec < 3 && tds < 500) {
      setWaterQuality("Good");
    }
    else {
      setWaterQuality("Poor");
    }
  }, [ec, tds]);


  useEffect(() => {
    setData({
      ec: Math.floor((Math.random() * 250 + 50)) / 100,
      ph: Math.floor((Math.random() * 60 + 680)) / 100,
      tds: Math.floor(Math.random() * 500 + 100),
      tempC: Math.floor((Math.random() * 70 + 200)) / 10
    })
    setInterval(() => {
      setData({
        ec: Math.floor((Math.random() * 250 + 50)) / 100,
        ph: Math.floor((Math.random() * 60 + 680)) / 100,
        tds: Math.floor(Math.random() * 500 + 100),
        tempC: Math.floor((Math.random() * 70 + 200)) / 10
      })
    }, 3000);
  }, []);
  
  return <></>;
}
