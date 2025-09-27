import { create } from "zustand";


export type toastHooksType = {
  isOpen: boolean,
  title: string,
  message: string,

  showMessage: (data: {title: string, message?: string, timeout?: number}) => void,
  closeToast: () => void,
};

export const useToastHooks = create<toastHooksType>((set) => ({
  isOpen: false,
  title: "",
  message: "",

  showMessage({ title, message, timeout }) {
    set(() => ({
      isOpen: true,
      title: title,
      message: message ?? "",
    }));
    
    if(timeout) {
      const { closeToast: clearMessage } = useToastHooks.getState();
      setTimeout(clearMessage, timeout);
    }
  },
  
  closeToast() {
    set(() => ({
      isOpen: false,
    }));
  },
}));


export default function toastHooksEffect() {
  return <></>;
}

