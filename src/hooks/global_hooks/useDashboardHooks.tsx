import { create } from "zustand";

export type TabType = "device_list" | 
                      "ai_reports" | 
                      "settings";

type useDashboardHooksType = {
  currentTab: TabType,
  setCurrentTab: (newTab: TabType) => void,
};

export const useDashboardHooks = create<useDashboardHooksType>((set) => ({
  currentTab: "device_list",
  setCurrentTab(newTab) {
      set(() => ({
        currentTab: newTab
      }));
  },
}));

export default function UseDashboardHooksEffect() {
  return <></>;
}