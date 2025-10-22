import { tabTypeToDescription, tabTypeToTitle, useDashboardHooks } from "../../../hooks/global_hooks/useDashboardHooks";

export default function DashboardNavbarInfo() {
      const { currentTab } = useDashboardHooks();
      return <>
            <div className="flex flex-col text-white w-full text-right">
                  <h1 className="text-xl font-semibold">{tabTypeToTitle[currentTab]}</h1>
                  <p className="text-sm font-thin">{tabTypeToDescription[currentTab]}</p>
            </div>
      </>;
}