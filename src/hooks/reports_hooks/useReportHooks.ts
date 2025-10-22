import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { expiration_modifier } from "../../utils/state_manager";
import type { AccessedModelAIReportType } from "../../lib/model";

type ReportHooksType = {
      currentReportId: string | null;
      currentReportDeviceName: string | null;
      setBasicReportData: (newReportId: string, deviceName: string) => void;

      reportData: AccessedModelAIReportType | null,
      setReportData: (newReportdata: AccessedModelAIReportType) => void,

      
      hasHydrated: boolean;
      setHasHydrated: () => void;
};

export const useReportHooks = create<ReportHooksType>()(
      persist(
            (set) => ({
                  currentReportId: null,
                  currentReportDeviceName: null,
                  setBasicReportData(newReportId, deviceName) {
                        set(() => ({
                              currentReportId: newReportId,
                              currentReportDeviceName: deviceName
                        }));
                  },
                  
                  reportData: null,
                  setReportData(newReportdata) {
                        set(() => ({
                              reportData: newReportdata,
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
                  merge(persistedState, currentState) {
                        return expiration_modifier<ReportHooksType, "reportData", "setReportData">(currentState, (persistedState as Partial<ReportHooksType>), "gaia-reports-data-created", "reportData", "setReportData", 30).done();
                  },
            }
      )
);