import { create } from "zustand";
import type { AccessedModelAIReportType } from "../../lib/model";
import { createJSONStorage, persist } from "zustand/middleware";
import { expiration_modifier } from "../../utils/state_manager";

export type AIReportsHooksType = {
      aiReports?: AccessedModelAIReportType[];
      setAIReports: (newAiReports: AccessedModelAIReportType[]) => void;

      aiReportKeyword: string;
      setAIReportKeyword: (newKeyword: string) => void;

      hasHydrated: boolean,
      setHasHydrated: () => void;
};

export const useDashboardReportsHooks = create<AIReportsHooksType>()(
      persist(
            (set) => ({
                  aiReports: undefined,
                  setAIReports(newAiReports) {
                        set(() => ({
                              aiReports: newAiReports,
                        }));
                  },

                  aiReportKeyword: "",
                  setAIReportKeyword(newKeyword) {
                        set(() => ({
                              aiReportKeyword: newKeyword
                        }));
                  },

                  hasHydrated: false,
                  setHasHydrated() {
                        set(() => ({
                              hasHydrated: true
                        }))
                  },
            }),
            {
                  name: "gaia-reports-data",
                  storage: createJSONStorage(() => sessionStorage),
                  onRehydrateStorage() {
                      return (state, error) => {
                        if(!error) state?.setHasHydrated();
                      }
                  },
                  merge(persistedState, currentState) {
                        return expiration_modifier<AIReportsHooksType, "aiReports", "setAIReports">(currentState, (persistedState as Partial<AIReportsHooksType>), "gaia-reports-data-created", "aiReports", "setAIReports", 60).done();
                  },
            }
      )
);