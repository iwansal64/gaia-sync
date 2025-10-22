import { useReportHooks } from "../../hooks/reports_hooks/useReportHooks";

export default function ReportSuggestionsSection() {
      const { reportData } = useReportHooks();
      
      return <>
            <div className="w-full h-fit p-4 pb-8 text-white border-t-2 border-gray-800">
                  <h1 className="text-lg font-semibold">Suggestions</h1>
                  <div className="text-sm font-light">
                        {reportData?.suggestions.trim().split(".").map((suggestion, index) => {
                              if(suggestion) return <p className="block" key={index}>- {suggestion}</p>
                        })}
                  </div>
            </div>
      </>;
}