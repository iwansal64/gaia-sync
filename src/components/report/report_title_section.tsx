import { useReportHooks } from "../../hooks/reports_hooks/useReportHooks";
import { fullDateFormat } from "../../utils/date_formatting";

export default function ReportTitleSection() {
      const { reportData } = useReportHooks();
      
      return <>
            <div className="w-full h-fit p-4 text-white border-t-2 border-gray-800">
                  <h1 className="text-2xl font-semibold">{reportData?.title}</h1>
                  <p className="text-md font-thin">{fullDateFormat(new Date(reportData?.created_at ?? 0))}</p>
            </div>
      </>;
}