import { create } from "zustand";


type Data = {
  waterQuality?: string,
  ec?: number,
  tds?: number,

  tempC?: number,

  ph?: number,
}

type UseDataHookType = Data & {
  setData: (newData: Data) => void,
};

export const useDataHooks = create<UseDataHookType>((set) => ({
  setData(newData) {
    set((state) => ({
      ...state,
      ...newData
    }))
  },
}));
