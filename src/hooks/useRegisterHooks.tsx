import { create } from "zustand";
import { API, LoginResponseEnum } from "../utils/api_interface";
import { useToastHooks } from "./useToastHooks";


export type registerHooksType = {
  newUsername: string,
  setNewUsername: (newUsername: string) => void,

  newPassword: string,
  setNewPassword: (newPassword: string) => void,

  newEmail: string,
  setNewEmail: (newEmail: string) => void,
};



export const useRegisterHooks = create<registerHooksType>((set) => ({
  newPassword: "",
  setNewPassword(newPassword) {
    set(() => ({
      newPassword: newPassword
    }));
  },
  
  newUsername: "",
  setNewUsername(newUsername) {
    set(() => ({
      newUsername: newUsername
    }));
  },

  newEmail: "",
  setNewEmail(newEmail) {
    set(() => ({
      newEmail: newEmail
    }));
  },
}));



export async function onRegisterPressed(email: string): Promise<boolean> {
  const { showMessage } = useToastHooks.getState();

  try {
    const response = await API.register(email);
    
    // If success,
    if(response) showMessage({ title: "Please check your email address!" });
    // If not,
    else         showMessage({ title: "An unknown error has occured!" });

    return response;
  }
  catch(e) {
    if(e instanceof TypeError) {
      console.log("Fetch Error!");
      showMessage({ title: "Network Error!", message: "There's unexpected error occured!", timeout: 5000 });
    }
    else {
      console.log("Some Other Error!");
    }
  }
  
  return false;
}



export default function LoginHooksEffect() {
  return <></>;
}