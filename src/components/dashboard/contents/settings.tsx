import SettingUserDataForm from "../../settings/setting_user_data_form";
import SettingSaveButton from "../../settings/setting_save_button";

export default function Settings() {
      return (
            <div className="w-full h-full p-10">
                  <div className="w-full h-full rounded-2xl p-4 flex flex-col gap-4 text-gray-600">
                        <div>
                              <h1 className="font-semibold text-2xl">User Data</h1>
                              <p className="font-thin text-md">Edit user profile data here</p>
                        </div>
                        <SettingUserDataForm />
                        <SettingSaveButton />
                  </div>
            </div>
      );
}
