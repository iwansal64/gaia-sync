import { create } from "zustand";

type SettingHooksType = {
      newUsername: string;
      setNewUsername: (newValue: string) => void;

      newPassword: string;
      setNewPassword: (newValue: string) => void;

      confirmPassword: string;
      setConfirmPassword: (newValue: string) => void;

      previousPassword: string;
      setPreviousPassword: (newValue: string) => void;
};

export const useSettingHooks = create<SettingHooksType>((set) => ({
      newUsername: "",
      setNewUsername(newValue) {
          set(() => ({
            newUsername: newValue
          }))
      },

      confirmPassword: "",
      setConfirmPassword(newValue) {
          set(() => ({
            confirmPassword: newValue
          }))
      },

      newPassword: "",
      setNewPassword(newValue) {
          set(() => ({
            newPassword: newValue
          }))
      },
      
      previousPassword: "",
      setPreviousPassword(newValue) {
          set(() => ({
            previousPassword: newValue
          }))
      },
}))

