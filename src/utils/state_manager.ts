import { useDashboardReportsHooks } from "../hooks/dashboard_hooks/useDashboardReportsHooks";
import { useUserDataHooks } from "../hooks/user_hooks/useUserDataHooks";

export const DATA_EXPIRATION_TIME = 60; // Data will expired after a minute

export function resetAllStorageState() {
      useDashboardReportsHooks.persist.clearStorage();
      useUserDataHooks.persist.clearStorage();
}