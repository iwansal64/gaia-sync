import { useEffect } from "react";
import { API } from "../../utils/api_interface";
import { useDashboardReportsHooks } from "./useDashboardReportsHooks";

let initialized = false;

export default function UseDashboardReportHooksEffect() {
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
