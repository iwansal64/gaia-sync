import { create } from "zustand";

type useAddDeviceHooksType = {
  connectDeviceModalState: boolean,
  showConnectDeviceModal: () => void,
  hideConnectDeviceModal: () => void,

  connectDeviceId: string,
  setConnectDeviceId: (newAddDeviceId: string) => void,

  isAddingDevice: boolean,
  setIsAddingDevice: (newState: boolean) => void
};

export const useAddDeviceHooks = create<useAddDeviceHooksType>((set) => ({
  connectDeviceModalState: false,
  showConnectDeviceModal() {
    set(() => ({
      connectDeviceModalState: true
    }));
  },
  hideConnectDeviceModal() {
    set(() => ({
      connectDeviceModalState: false
    }));
  },

  connectDeviceId: "",
  setConnectDeviceId(newAddDeviceId) {
    set(() => ({
      connectDeviceId: newAddDeviceId
    }));
  },

  isAddingDevice: false,
  setIsAddingDevice(newState) {
      set(() => ({
        isAddingDevice: newState
      }));
  },
}));

export default function UseAddDeviceHooksEffect() {
  return <></>;
}