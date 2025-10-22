import { create } from "zustand";

export type deviceListHookType = {
      deviceSearchKeyword: string,
      setDeviceSearchKeyword: (newDeviceSearchKeyword: string) => void
};


export const useDeviceListHooks = create<deviceListHookType>((set) => ({
      deviceSearchKeyword: "",
      setDeviceSearchKeyword(newDeviceSearchKeyword) {
          set(() => ({
            deviceSearchKeyword: newDeviceSearchKeyword
          }));
      },
}));