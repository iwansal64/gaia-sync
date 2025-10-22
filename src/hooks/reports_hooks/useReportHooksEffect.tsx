import { useEffect } from "react";
import { API } from "../../utils/api_interface";
import { useReportHooks } from "./useReportHooks";

export default function UseReportHooksEffect() {
      const { currentReportId, reportData, setReportData } = useReportHooks();
      
      useEffect(() => {
            if(!currentReportId || (reportData !== null && currentReportId == reportData.id)) return;
            
            API.get_ai_report(currentReportId).then((data) => {
                  if(!data) return;

                  setReportData(data);
            })
      }, [currentReportId, reportData]);
      
      return <></>;
}