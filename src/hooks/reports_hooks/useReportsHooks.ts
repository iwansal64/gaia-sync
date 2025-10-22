import { useEffect } from "react";
import { create } from "zustand";

type reportHooksType = {
      currentReportId: string | null,
      setReportId: (newReportId: string) => void
};

export const useReportsHooks = create<reportHooksType>((set) => ({
      currentReportId: null,
      setReportId(newReportId) {
          set(() => ({
            currentReportId: newReportId
          }));
      },
}));