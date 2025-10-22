import { create } from "zustand";

type dashboardSidebarHooksType = {
      open: boolean,
      setOpen: (newState: boolean) => void
};


export const useDashboardSidebarHooks = create<dashboardSidebarHooksType>((set) => ({
      open: false,
      setOpen(newState) {
          set(() => ({
            open: newState
          }));
      },
}))