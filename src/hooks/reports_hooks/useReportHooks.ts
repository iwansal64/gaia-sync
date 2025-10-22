import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type reportHooksType = {
      currentReportId: string | null;
      currentReportDeviceName: string | null;
      setReportData: (newReportId: string, deviceName: string) => void;
      
      hasHydrated: boolean;
      setHasHydrated: () => void;
};

export const useReportHooks = create<reportHooksType>()(
      persist(
            (set) => ({
                  currentReportId: null,
                  currentReportDeviceName: null,
                  setReportData(newReportId, deviceName) {
                        set(() => ({
                              currentReportId: newReportId,
                              currentReportDeviceName: deviceName
                        }));
                  },
                  
                  hasHydrated: false,
                  setHasHydrated() {
                        set(() => ({
                              hasHydrated: true
                        }));
                  },
            }),
            {
                  name: "gaia-report-data",
                  storage: createJSONStorage(() => sessionStorage),
                  onRehydrateStorage(state) {
                        return (state, error) => {
                              // after hydration success
                              if(!error) state?.setHasHydrated();
                        };
                  },
            }
      )
);