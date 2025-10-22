import { useReportHooks } from "../../hooks/reports_hooks/useReportHooks";

export default function ReportFactSection() {
      const { reportData } = useReportHooks();

      return <>
            <div className="w-full h-fit p-4 pb-8 text-white border-t-2 border-gray-800">
                  <h1 className="text-lg font-semibold">Fact</h1>
                  <p className="text-sm font-light">{reportData?.fact}</p>
            </div>
      </>;
}