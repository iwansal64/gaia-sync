import { useEffect } from "react";
import { useReportHooks } from "../../hooks/reports_hooks/useReportHooks";


export default function ReportInfo() {
      const { currentReportDeviceName, hasHydrated } = useReportHooks();

      useEffect(() => {
            if(hasHydrated && !currentReportDeviceName) {
                  window.location.href = "/";
            }
      }, [currentReportDeviceName, hasHydrated]);

      return <>
            <div className="flex flex-col gap-0 text-right *:w-full">
                  <h1 className="text-white text-xl font-semibold">Report Result</h1>
                  <p className="text-gray-300 italic">{currentReportDeviceName}</p>
            </div>
      </>;
}