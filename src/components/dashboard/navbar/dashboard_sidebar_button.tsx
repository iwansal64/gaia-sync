import { useDashboardSidebarHooks } from "../../../hooks/dashboard_hooks/useDahboardSidebarHooks";
import { useDashboardHooks, type TabType } from "../../../hooks/global_hooks/useDashboardHooks";

export default function DashboardSidebarButtons() {
  return <>
    <div className="flex flex-col w-full mt-4">
      <DashboarSidebardButton  tab_name="Device List" tab_type="device_list" />
      <DashboarSidebardButton  tab_name="AI Reports" tab_type="ai_reports" />
      <DashboarSidebardButton  tab_name="Settings" tab_type="settings" />
    </div>
  </>;
}


interface DashboardSidebarButtonType {
  tab_name: string,
  tab_type: TabType,
};

function DashboarSidebardButton(props: DashboardSidebarButtonType) {
  const { currentTab, setCurrentTab } = useDashboardHooks();
  return <button className={`w-full p-4 text-white cursor-pointer duration-200 ${currentTab == props.tab_type ? "bg-[#0005]" : "bg-transparent hover:bg-[#5c0]"}`} onClick={() => setCurrentTab(props.tab_type)}>{props.tab_name}</button>
}