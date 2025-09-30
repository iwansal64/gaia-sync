import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware"
import { Message, Client as MQTTClient } from "paho-mqtt";
import { useEffect } from "react";
import { useDataHooks } from "./useDataHooks";

export type UseConnectionHooksType = {
  isConnected: boolean,
  setIsConnected: (newState: boolean) => void,

  userId?: string,
  setUserId: (newUserId: string) => void,

  accessToken?: string,
  setAccessToken: (newAccessToken: string) => void,

  clearLoginInfo: () => void
};

export const useConnectionHooks = create<UseConnectionHooksType>()(
  persist(
    (set) => ({
      isConnected: false,

      setIsConnected(newState) {
        set(() => ({ isConnected: newState }));
      },

      userId: "",

      setUserId(newClientId) {
        set(() => ({
          userId: newClientId
        }));    
      },

      accessToken: "",

      setAccessToken(newAccessToken) {
        set(() => ({
          accessToken: newAccessToken
        }));
      },

      clearLoginInfo() {
        set(() => ({
          accessToken: "",
          userId: ""
        }));
      },
    }),
    {
      name: "gaia-connection-data",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ userId: state.userId, accessToken: state.accessToken }),
    }
));

function constructMessageData(message: string) {
  const keyValuePairs: string[][] = message.split(";").map(data => data.split("="));
  let returnValue: {
    [key: string]: string | number
  } = {};

  keyValuePairs.forEach(([key, value]) => {
    const possibleNumber = Number.parseFloat(value);
    if(isNaN(possibleNumber)) {
      returnValue[key] = value;
    }
    else {
      returnValue[key] = possibleNumber;
    }
  });

  return returnValue;
}

export default function UseConnectionHooksEffect() {
  const { userId, accessToken, setIsConnected } = useConnectionHooks();
  const { setData } = useDataHooks();

  useEffect(() => {
    return; // Temporary for development only
    // if(!userId || !accessToken) return;

    
    // const mqttClient = new MQTTClient("172.27.218.82", 9001, userId);

    // mqttClient.onConnectionLost = (responseObject) => {
    //   console.log("Connection lost:", responseObject.errorMessage);
    //   setIsConnected(false);
    // };

    // mqttClient.onMessageArrived = (message: Message) => {
    //   const data = constructMessageData(message.payloadString);
    //   console.log(data);
    //   setData(data);
    // };


    // console.log("CONNECTING..");
    // mqttClient.connect({
    //   useSSL: false,
    //   userName: userId,
    //   password: accessToken,
    //   onSuccess: () => {
    //     console.log("MQTT Connected!");
    //     mqttClient.subscribe("PwlDq");
    //   },
    //   onFailure: (err) => {
    //     console.error("There's an error");
    //     console.error(err);
    //   }
    // });

    // return (() => {
    //   if(mqttClient.isConnected()) {
    //     mqttClient.disconnect();
    //   }
    // });
  }, []);
  
  return <></>;
}