import { useDashboardHooks, type TabType } from "../../../hooks/useDashboardHooks";

export default function NavbarButtons() {
  return <>
    <div className="flex flex-col w-full mt-4">
      <NavbarButton  tab_name="Device List" tab_type="device_list" />
      <NavbarButton  tab_name="AI Assistance" tab_type="ai_assistance" />
      <NavbarButton  tab_name="Settings" tab_type="settings" />
    </div>
  </>;
}


interface NavbarButtonProps {
  tab_name: string,
  tab_type: TabType,
};

function NavbarButton(props: NavbarButtonProps) {
  const { currentTab, setCurrentTab } = useDashboardHooks();
  return <button className={`w-full p-4 text-white cursor-pointer duration-200 ${currentTab == props.tab_type ? "bg-[#0005]" : "bg-transparent hover:bg-[#5c0]"}`} onClick={() => setCurrentTab(props.tab_type)}>{props.tab_name}</button>
}