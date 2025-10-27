import { create } from "zustand";

let toastTimeoutInstance: NodeJS.Timeout | null = null;

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

  showMessage({ title, message, timeout = 2000 }) {
    set(() => ({
      isOpen: true,
      title: title,
      message: message ?? "",
    }));
    
    if(timeout) {
      const { closeToast: clearMessage } = useToastHooks.getState();
      if(toastTimeoutInstance) clearTimeout(toastTimeoutInstance);
      toastTimeoutInstance = setTimeout(clearMessage, timeout);
    }
  },
  
  closeToast() {
    set(() => ({
      isOpen: false,
    }));
  },
}));
