import { useAIReportsHook } from "../hooks/dashboard_hooks/useAIReportsHooks";
import { useUserDataHooks } from "../hooks/user_hooks/useUserDataHooks";


export function resetAllStorageState() {
      useAIReportsHook.persist.clearStorage();
      useUserDataHooks.persist.clearStorage();
}