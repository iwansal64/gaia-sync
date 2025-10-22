import { create } from "zustand";

export type UseConnectionHooksType = {
  isConnected: boolean,
  setIsConnected: (newState: boolean) => void,
};

export const useConnectionHooks = create<UseConnectionHooksType>()((set) => ({
  isConnected: false,

  setIsConnected(newState) {
    set(() => ({ isConnected: newState }));
  },
}));
