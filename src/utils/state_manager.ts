import { useAddDeviceHooks } from "../hooks/dashboard_hooks/useDashboardAddDeviceHook";
import { useDashboardReportsHooks } from "../hooks/dashboard_hooks/useDashboardReportsHooks";
import { useReportHooks } from "../hooks/reports_hooks/useReportHooks";
import { useConnectionHooks } from "../hooks/sensor_hooks/useConnectionHooks";
import { useUserDataHooks } from "../hooks/user_hooks/useUserDataHooks";

export const DATA_EXPIRATION_TIME = 60; // Data will expired after a minute

export function resetAllStorageState() {
      useDashboardReportsHooks.persist.clearStorage();
      useUserDataHooks.persist.clearStorage();
      useReportHooks.persist.clearStorage();
}

type ExpirationModifierResult<T extends object> = {
      add: <K extends keyof T, L extends keyof T>(expirationName: string, key: K, keySetter: L, expire_in_secs: number) => ExpirationModifierResult<T>
      done: () => T
}

export function expiration_modifier<T extends object, K extends keyof T, L extends keyof T>(defaultState: T, persistedState: Partial<T>, expirationName: string, key: K, keySetter: L, expire_in: number, initial_modified_result?: Partial<T>): ExpirationModifierResult<T> {
      let result: Partial<T> = initial_modified_result ?? {};
      result[keySetter] = ((newData: K) => {
            (defaultState[keySetter] as Function)(newData);

            sessionStorage.setItem(expirationName, new Date().toString());
      }) as any;
      
      const reportTimestamp: string | null = sessionStorage.getItem(expirationName);
      const reportTimestampDate: Date | null = reportTimestamp ? new Date(reportTimestamp) : null;

      // If the report timestamp date is not exists or the report data expired
      if (!reportTimestampDate || (Date.now().valueOf() - reportTimestampDate.valueOf()) > (expire_in * 1000)) {
            // Remove session timestamp data
            sessionStorage.removeItem(expirationName);

            // Reset the AI reports data
            let modifiedKey: Partial<T> = {};
            modifiedKey[key] = defaultState[key];

            result = {
                  ...defaultState,
                  ...(persistedState as any),
                  ...result,
                  ...modifiedKey,
            };
      }


      return {
            add: <K extends keyof T, L extends keyof T>(expirationName: string, key: K, keySetter: L, expire_in: number) => expiration_modifier(defaultState, persistedState, expirationName, key, keySetter, expire_in, result),
            done: () => ({
                  ...defaultState,
                  ...(persistedState as any),
                  ...result,
            })
      };
}