import { useDashboardSidebarHooks } from "../../../hooks/dashboard_hooks/useDahboardSidebarHooks";
import { FiMenu } from "react-icons/fi";

export default function DashboardSidebarOpen() {
      const { setOpen } = useDashboardSidebarHooks();

      const handleOpenSidebar = () => {
            setOpen(true);
      }

      return <button className="md:hidden p-2 bg-transparent border-white border-2 rounded-full cursor-pointer" onClick={() => handleOpenSidebar()}>
            <FiMenu color="white" fontSize={24} />
      </button>;
}