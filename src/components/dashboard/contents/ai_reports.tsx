import UseAIReportHooksEffect, { useAIReportsHook } from "../../../hooks/dashboard_hooks/useAIReportsHooks";
import UseUserDataHooksEffect, { useUserDataHooks } from "../../../hooks/user_hooks/useUserDataHooks";
import { dateFormat } from "../../../utils/date_formatting";

export default function AIReports() {
      const { aiReports } = useAIReportsHook();
      const { indexedDevicesData } = useUserDataHooks();
      
      return (
            <>
                  <UseUserDataHooksEffect />
                  <UseAIReportHooksEffect />
                  <div className="w-full h-full bg-gray-200">
                        <div className="w-full h-full flex flex-col">
                              <div className="w-full h-fit px-2 bg-gray-400 flex flex-row">
                                    <input type="text" className="px-6 py-6 outline-none w-full" placeholder="Search for device log title" />
                              </div>
                              <div className="w-full h-full p-10">
                                    <div className="w-full h-full rounded-2xl">
                                          {/* Tables */}
                                          <div className="grid auto-rows-[50px] grid-flow-rows">
                                                <div className="grid grid-cols-[70px_1fr_0.5fr_0.5fr] *:w-full *:h-full *:flex *:items-center border-b-1">
                                                      <div className="cursor-pointer hover:bg-gray-300 pl-2">No.</div>
                                                      <div className="cursor-pointer hover:bg-gray-300 pl-2">Report Title</div>
                                                      <div className="cursor-pointer hover:bg-gray-300 pl-2">Device</div>
                                                      <div className="cursor-pointer hover:bg-gray-300 pl-2">Date</div>
                                                </div>
                                                {
                                                      (() => {
                                                            // If the there's no devices data
                                                            if(!indexedDevicesData || Object.keys(indexedDevicesData).length == 0) return <></>;

                                                            return aiReports?.map(
                                                                  (reportData, index) => (
                                                                        <ReportEntry 
                                                                              title={reportData.title}
                                                                              device_name={indexedDevicesData[reportData.device_id].device_name}
                                                                              date={new Date(reportData.created_at)}
                                                                              index={index}
                                                                              key={index}
                                                                        />
                                                                  )
                                                            )
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
}

function ReportEntry(props: ReportEntryProps) {
      const handleClick = () => {
            
      };

      return (
            <>
                  <div className="grid grid-cols-[70px_1fr_0.5fr_0.5fr] *:w-full *:h-full *:flex *:items-center *:pl-2 cursor-pointer hover:bg-gray-300" onClick={handleClick}>
                        <div>
                              <p>{props.index}</p>
                        </div>
                        <div>
                              <p className="truncate">{props.title}</p>
                        </div>
                        <div>
                              <p>{props.device_name}</p>
                        </div>
                        <div>
                              <p>{dateFormat(props.date)}</p>
                        </div>
                  </div>
            </>
      );
}
