import { create } from "zustand";
import { API, LoginResponseEnum } from "../utils/api";
import { useToastHooks } from "./useToastHooks";


export type loginHooksType = {
  username: string,
  setUsername: (newUsername: string) => void,

  password: string,
  setPassword: (newPassword: string) => void
};



export const useLoginHooks = create<loginHooksType>((set) => ({
  password: "",
  setPassword(newPassword) {
    set(() => ({
      password: newPassword
    }));
  },
  
  username: "",
  setUsername(newUsername) {
    set(() => ({
      username: newUsername
    }));
  },
}));



export async function onLoginPressed(username: string, password: string) {
  const { showMessage } = useToastHooks.getState();

  try {
    const response = await API.login(username, password);
    if(response == LoginResponseEnum.Authorized) showMessage({ title: "Successfully Login!" });
    else if(response == LoginResponseEnum.Unauthorized) showMessage({ title: "Username or password is wrong!" });
    else if(response == LoginResponseEnum.Error) showMessage({ title: "An unknown error has occured!" });
  }
  catch(e) {
    if(e instanceof TypeError) {
      console.log("Fetch Error!");
      showMessage({ title: "Fetch Error!", message: "There's unexpected error occured!", timeout: 5000 });
    }
    else {
      console.log("Some Other Error!");
    }
  }
}



export default function LoginHooksEffect() {
  return <></>;
}