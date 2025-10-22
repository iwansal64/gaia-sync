import { useDashboardSidebarHooks } from "../../../hooks/dashboard_hooks/useDahboardSidebarHooks";

export default function DashboardNavbarTrigger() {
      const { open } = useDashboardSidebarHooks();
      return <span className={open ? "active" : ""}></span>
}