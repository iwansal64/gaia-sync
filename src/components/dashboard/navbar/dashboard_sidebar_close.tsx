import { useDashboardSidebarHooks } from "../../../hooks/dashboard_hooks/useDahboardSidebarHooks";
import { IoClose } from "react-icons/io5";

export default function DashboardSidebarClose() {
      const { setOpen } = useDashboardSidebarHooks();

      const handleCloseSidebar = () => {
            setOpen(false);
      }

      return <>
            <button className="absolute md:hidden top-10 right-10 p-2 bg-transparent border-white border-2 rounded-full cursor-pointer" onClick={() => handleCloseSidebar()}>
                  <IoClose color="white" fontSize={24} />
            </button>
      </>
}