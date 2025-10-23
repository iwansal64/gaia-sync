import { useChatbotHooks } from "../../hooks/chatbot_hooks/useChatbotHooks";
import { useDeviceDataHooks } from "../../hooks/device_hooks/useDeviceDataHooks";

export default function ChatbotNavbarInfo() {
      const { deviceIdContext } = useChatbotHooks();
      const { indexedDevicesData } = useDeviceDataHooks();
      
      return <>
            <div className="flex flex-col text-white w-full text-right bg-gray-600">
                  <h1 className="text-xl font-semibold">Chatbot AI</h1>
                  <p className="text-sm font-thin">Current Device:  
                        {
                              (() => {
                                    // If either indexed devices data and device id context is not available
                                    if(!indexedDevicesData || !deviceIdContext) return <span> ----------------</span>;
                                    const deviceData = indexedDevicesData[deviceIdContext];
                                    
                                    // If there's no valid device ID in the indexed devices data
                                    if(!deviceData) return;

                                    return <span> {deviceData.device_name}</span>
                              })()
                        }
                  </p>
            </div>
      </>;
}