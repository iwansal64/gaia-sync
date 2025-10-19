import { useDashboardHooks } from "../../../hooks/global_hooks/useDashboardHooks";
import AIAssistance from "./ai_assistance";
import DeviceList from "./device_list";
import Settings from "./settings";


export default function ContentController() {
  const { currentTab } = useDashboardHooks();

  switch (currentTab) {
    case "device_list":
      return <DeviceList />
    
    case "ai_assistance":
      return <AIAssistance />

    case "settings":
      return <Settings />
  
    default:
      break;
  }
  
  return <></>;
}