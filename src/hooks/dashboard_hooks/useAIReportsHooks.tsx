import { useEffect } from "react";
import { create } from "zustand";
import { API } from "../../utils/api_interface";
import type { AccessedModelAIReportType } from "../../lib/model";
import { createJSONStorage, persist } from "zustand/middleware";

export type AIReportsHooksType = {
      aiReports?: AccessedModelAIReportType[]
      setAIReports: (newAiReports: AccessedModelAIReportType[]) => void
};

export const useAIReportsHook = create<AIReportsHooksType>()(
      persist(
            (set) => ({
                  aiReports: undefined,
                  setAIReports(newAiReports) {
                        set(() => ({
                              aiReports: newAiReports
                        }));
                  },
            }),
            {
                  name: "gaia-reports-data",
                  storage: createJSONStorage(() => sessionStorage)
            }
      )
);

let initialized = false;

export default function UseAIReportHooksEffect() {
      const { setAIReports } = useAIReportsHook();
      
      const initialize = async () => {
            await useAIReportsHook.persist.rehydrate();
            if(useAIReportsHook.getState().aiReports !== undefined) return;


            API.get_ai_reports().then(ai_reports_data => {
                  if(ai_reports_data) setAIReports(ai_reports_data);
            })

            initialized = true;
      }
      
      useEffect(() => {
            if(!initialized) initialize();
      }, []);
      
      return <></>;
}