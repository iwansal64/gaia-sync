import { useEffect } from "react";
import { create } from "zustand";
import { API } from "../../utils/api_interface";
import type { AccessedModelAIReportType } from "../../lib/model";
import { createJSONStorage, persist } from "zustand/middleware";
import { DATA_EXPIRATION_TIME } from "../../utils/state_manager";

export type AIReportsHooksType = {
      aiReports?: AccessedModelAIReportType[];
      setAIReports: (newAiReports: AccessedModelAIReportType[]) => void;

      aiReportKeyword: string;
      setAIReportKeyword: (newKeyword: string) => void;
};

export const useDashboardReportsHooks = create<AIReportsHooksType>()(
      persist(
            (set) => ({
                  aiReports: undefined,
                  setAIReports(newAiReports) {
                        set(() => ({
                              aiReports: newAiReports,
                        }));

                        sessionStorage.setItem("reports-timestamp", new Date().toString());
                  },

                  aiReportKeyword: "",
                  setAIReportKeyword(newKeyword) {
                        set(() => ({
                              aiReportKeyword: newKeyword
                        }));
                  },
            }),
            {
                  name: "gaia-reports-data",
                  storage: createJSONStorage(() => sessionStorage),
                  merge(persistedState, currentState) {
                        let result: Partial<AIReportsHooksType> = {};

                        const reportTimestamp: string | null = sessionStorage.getItem("report-timestamp");
                        const reportTimestampDate: Date | null = reportTimestamp ? new Date(reportTimestamp) : null;

                        // If the report timestamp date is not exists or the report data expired
                        if (!reportTimestampDate || reportTimestampDate.valueOf() - Date.now().valueOf() > DATA_EXPIRATION_TIME) {
                              // Remove session timestamp data
                              sessionStorage.removeItem("report-timestamp");

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
                              ...result,
                        };
                  },
            }
      )
);

let initialized = false;

export default function UseAIReportHooksEffect() {
      const { setAIReports } = useDashboardReportsHooks();

      const initialize = async () => {
            await useDashboardReportsHooks.persist.rehydrate();
            if (useDashboardReportsHooks.getState().aiReports !== undefined) return;

            API.get_ai_reports().then((ai_reports_data) => {
                  if (ai_reports_data) setAIReports(ai_reports_data);
            });

            initialized = true;
      };

      useEffect(() => {
            if (!initialized) initialize();
      }, []);

      return <></>;
}
