import { useDashboardHooks } from "../../../hooks/global_hooks/useDashboardHooks";
import AIReports from "./ai_reports";
import DeviceList from "./device_list";
import Settings from "./settings";


export default function ContentController() {
  const { currentTab } = useDashboardHooks();

  switch (currentTab) {
    case "device_list":
      return <DeviceList />
    
    case "ai_reports":
      return <AIReports />

    case "settings":
      return <Settings />
  
    default:
      break;
  }
  
  return <></>;
}