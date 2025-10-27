import { useEffect } from "react";
import { useSettingHooks } from "../../hooks/setting_hooks/useSettingHooks";
import { useUserDataHooks } from "../../hooks/user_hooks/useUserDataHooks";

export default function SettingUserDataForm() {
      const { newUsername, setNewUsername, newPassword, setNewPassword, confirmPassword, setConfirmPassword, previousPassword, setPreviousPassword } = useSettingHooks();
      const { username } = useUserDataHooks();

      useEffect(() => {
            if(username) setNewUsername(username);
      }, [username])
      
      return <>
            <div className="w-full h-full flex flex-col gap-4 *:text-gray-700 *:border-gray-700 *:font-semibold">
                  <input value={newUsername} onChange={(e) => setNewUsername(e.target.value)} placeholder="New Username" id="new_username" type="text" className="bg-transparent border border-black p-4 rounded-full" />
                  <input value={previousPassword} onChange={(e) => setPreviousPassword(e.target.value)} placeholder="Previous Password" id="prev_password" type="password" className="bg-transparent border border-black p-4 rounded-full" autoComplete="off" autoCorrect="off" />
                  <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" id="new_password" type="password" className="bg-transparent border border-black p-4 rounded-full" autoComplete="off" autoCorrect="off" />
                  <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm New Password" id="confirm_password" type="password" className="bg-transparent border border-black p-4 rounded-full" autoComplete="off" autoCorrect="off" />
            </div>
      </>;
}