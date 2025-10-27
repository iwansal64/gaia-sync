import { useToastHooks } from "../../hooks/global_hooks/useToastHooks";
import { useSettingHooks } from "../../hooks/setting_hooks/useSettingHooks";
import { API, UpdateUserResponseEnum } from "../../utils/api_interface";

export default function SettingSaveButton() {
      const { confirmPassword, newPassword, newUsername, previousPassword, setPreviousPassword, setNewPassword, setConfirmPassword } = useSettingHooks();
      const { showMessage } = useToastHooks();
      
      const handleSave = async () => {
            // Check if there's a field that is currently empty (hasn't filled by the user yet)
            if(confirmPassword == "" || newUsername == "" || newPassword == "" || previousPassword == "") {
                  showMessage({
                        title: "Error",
                        message: "All of the field should be filled",
                        timeout: 3000
                  });
                  return;
            }
            
            // Check if the confirmation is the same as the new password the user want to change to
            if(confirmPassword != newPassword) {
                  showMessage({
                        title: "Error",
                        message: "The new password and confirmation password is not the same",
                        timeout: 3000
                  });
                  return;
            }

            // Check the minimal length of password
            if(newPassword.length < 8) {
                  showMessage({
                        title: "Error",
                        message: "The new password should atleast 8 characters",
                        timeout: 3000
                  });
                  return;
            }

            // Request change of user data to the API
            const result = await API.update_user(newUsername, newPassword, previousPassword);
            switch(result) {
                  case UpdateUserResponseEnum.Authorized:
                        showMessage({ title: "Success!", message: "Successfully changed user data!", timeout: 5000 });
                        setPreviousPassword("");
                        setNewPassword("");
                        setConfirmPassword("");
                        break;
                  case UpdateUserResponseEnum.Unauthorized:
                        showMessage({ title: "Error", message: "Unauthorized" });
                        break;
                  case UpdateUserResponseEnum.UnauthorizedPrevPassword:
                        showMessage({ title: "Wrong password", message: "The previous password is wrong!" });
                        break;
                  case UpdateUserResponseEnum.Error:
                        showMessage({ title: "Internal Server Error", message: "There's an unknown error" });
                        break;
                  case UpdateUserResponseEnum.NotFound:
                        showMessage({ title: "The user data is not found!" });
                        break;
            }
      }

      return <>
            <div className="w-full flex flex-row justify-end">
                  <button className="p-4 bg-gray-700 text-white font-semibold rounded-full cursor-pointer hover:brightness-90" onClick={handleSave}>
                        Save
                  </button>
            </div>
      </>;
}