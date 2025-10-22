import { create } from "zustand";
import type { AccessedModelAIReportType } from "../../lib/model";
import { createJSONStorage, persist } from "zustand/middleware";
import { DATA_EXPIRATION_TIME } from "../../utils/state_manager";

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

                        sessionStorage.setItem("gaia-reports-data-timestamp", new Date().toString());
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
                        let result: Partial<AIReportsHooksType> = {};

                        const reportTimestamp: string | null = sessionStorage.getItem("gaia-reports-data-timestamp");
                        const reportTimestampDate: Date | null = reportTimestamp ? new Date(reportTimestamp) : null;

                        // If the report timestamp date is not exists or the report data expired
                        if (!reportTimestampDate || (Date.now().valueOf() - reportTimestampDate.valueOf()) > (DATA_EXPIRATION_TIME * 1000)) {
                              // Remove session timestamp data
                              sessionStorage.removeItem("gaia-reports-data-timestamp");

                              // Reset the AI reports data
                              result = {
                                    ...currentState,
                                    ...(persistedState as any),
                                    ...result,
                                    aiReports: currentState.aiReports,
                              };
                        }

                        return {
                              ...currentState,
                              ...(persistedState as any),
                              ...result,
                        };
                  },
            }
      )
);