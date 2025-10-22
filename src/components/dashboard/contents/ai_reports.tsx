import UseAIReportHooksEffect, { useAIReportsHook } from "../../../hooks/dashboard_hooks/useDashboardReportsHooks";
import UseDeviceDataHooksEffect, { useDeviceDataHooks } from "../../../hooks/device_hooks/useDeviceDataHooks";
import { dateFormat } from "../../../utils/date_formatting";

export default function AIReports() {
      const { aiReports, aiReportKeyword, setAIReportKeyword } = useAIReportsHook();
      const { indexedDevicesData } = useDeviceDataHooks();
      
      return (
            <>
                  <UseDeviceDataHooksEffect />
                  <UseAIReportHooksEffect />
                  <div className="w-full h-full bg-gray-200">
                        <div className="w-full h-full flex flex-col p-4">
                              <input id="device-search-keyword" type="text" className="bg-gray-400 px-6 py-3 outline-none w-full rounded-full" placeholder="Search for device name" onChange={(e) => setAIReportKeyword(e.target.value.toLowerCase())} />
                              <div className="w-full h-full mt-6 overflow-auto">
                                    <div className="w-full h-full rounded-2xl">
                                          {/* Tables */}
                                          <div className="flex flex-col gap-2 md:grid md:auto-rows-[50px] md:grid-flow-rows">
                                                <div className="hidden md:grid grid-cols-[70px_1fr_0.5fr_0.5fr] *:w-full *:h-full *:flex *:items-center border-b-1">
                                                      <div className="cursor-pointer hover:bg-gray-300 pl-2">No.</div>
                                                      <div className="cursor-pointer hover:bg-gray-300 pl-2">Report Title</div>
                                                      <div className="cursor-pointer hover:bg-gray-300 pl-2">Device</div>
                                                      <div className="cursor-pointer hover:bg-gray-300 pl-2">Date</div>
                                                </div>
                                                {
                                                      (() => {
                                                            // If the there's no devices data
                                                            if(!indexedDevicesData || Object.keys(indexedDevicesData).length == 0 || !aiReports) return <></>;

                                                            const result = aiReports.flatMap(
                                                                  (reportData, index) => {
                                                                        if(!reportData.title.toLowerCase().includes(aiReportKeyword)) return [];

                                                                        return [<ReportEntry 
                                                                              id={reportData.id}
                                                                              title={reportData.title}
                                                                              device_name={indexedDevicesData[reportData.device_id].device_name}
                                                                              date={new Date(reportData.created_at)}
                                                                              index={index}
                                                                              key={index}
                                                                        />];
                                                                  }
                                                            );

                                                            if(aiReports.length == 0) {
                                                                  return <p className="opacity-50">There's no reports for your devices</p>
                                                            }
                                                            else if(result.length == 0) {
                                                                  return <p className="opacity-50">There's no reports matches your search keyword</p>
                                                            }

                                                            return result;
                                                      })()
                                                }
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </>
      );
}

interface ReportEntryProps {
      index: number;
      title: string;
      device_name: string;
      date: Date;
      id: string;
}

function ReportEntry(props: ReportEntryProps) {
      const formattedDate = dateFormat(props.date);
      
      const handleClick = () => {
            window.location.href = "/report/" + props.id;
      };

      return (
            <>
                  {/* Laptop View */}
                  <div className="hidden md:grid grid-cols-[70px_1fr_0.5fr_0.5fr] *:w-full *:h-full *:flex *:items-center *:pl-2 cursor-pointer hover:bg-gray-300" onClick={handleClick}>
                        <div>
                              <p>{props.index+1}</p>
                        </div>
                        <div>
                              <p className="truncate">{props.title}</p>
                        </div>
                        <div>
                              <p>{props.device_name}</p>
                        </div>
                        <div>
                              <p>{formattedDate}</p>
                        </div>
                  </div>
                  
                  {/* Mobile View */}
                  <div className="flex md:hidden flex-col w-full p-6 bg-gray-400 rounded-2xl cursor-pointer hover:brightness-75">
                        <p className="text-sm">{(formattedDate)}</p>
                        <h1 className="text-xl font-semibold">{props.title}</h1>
                        <p className="text-md mt-8 font-light">Device: <span className="">{props.device_name}</span></p>
                  </div>
            </>
      );
}
