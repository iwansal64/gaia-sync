import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware"
import { Message, Client as MQTTClient } from "paho-mqtt";
import { useEffect } from "react";
import { useSensorDataHooks } from "./useSensorDataHooks";
import { useUserDataHooks } from "./useUserDataHooks";

export type UseConnectionHooksType = {
  isConnected: boolean,
  setIsConnected: (newState: boolean) => void,
};

export const useConnectionHooks = create<UseConnectionHooksType>()((set) => ({
  isConnected: false,

  setIsConnected(newState) {
    set(() => ({ isConnected: newState }));
  },
}));

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
  const { setIsConnected } = useConnectionHooks();
  const { accessToken, userId } = useUserDataHooks();
  const { setData } = useSensorDataHooks();

  useEffect(() => {
    if(!userId || !accessToken) return;

    
    const mqttClient = new MQTTClient("mqttws.gaia-odc.domain", 443, "/", userId);

    mqttClient.onConnectionLost = (responseObject) => {
      console.log("Connection lost:", responseObject.errorMessage);
      setIsConnected(false);
    };

    mqttClient.onMessageArrived = (message: Message) => {
      const data = constructMessageData(message.payloadString);
      console.log(data);
      setData(data);
    };


    console.log("CONNECTING..");
    mqttClient.connect({
      useSSL: true,
      userName: userId,
      password: accessToken,
      onSuccess: () => {
        console.log("MQTT Connected!");
        mqttClient.subscribe("PwlDq");
      },
      onFailure: (err) => {
        console.error("There's an error");
        console.error(err);
      },
    });

    return (() => {
      if(mqttClient.isConnected()) {
        mqttClient.disconnect();
      }
    });
  }, []);
  
  return <></>;
}