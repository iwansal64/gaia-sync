import { create } from "zustand";


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



export function onLoginPressed(username: string, password: string) {
  console.log(username);
  console.log(password);
}



export default function LoginHooksEffect() {
  return <></>;
}