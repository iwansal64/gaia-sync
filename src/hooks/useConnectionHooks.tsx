import { create } from "zustand";
import { Message, Client as MQTTClient } from "paho-mqtt";
import { useEffect } from "react";
import { useDataHooks } from "./useDataHooks";

export type UseConnectionHooksType = {
  isConnected: boolean,
  setIsConnected: (newState: boolean) => void,

  userId?: string,
  setUserId: (newUserId: string) => void,
};

export const useConnectionHooks = create<UseConnectionHooksType>((set) => ({
  isConnected: false,

  setIsConnected(newState) {
    set(() => ({ isConnected: newState }));
  },

  userId: "cEiiw",

  setUserId(newClientId) {
    set(() => ({
      userId: newClientId
    }));    
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
  const { userId, setIsConnected } = useConnectionHooks();
  const { setData } = useDataHooks();

  useEffect(() => {
    if(!userId) return;

    const mqttClient = new MQTTClient("localhost", 9001, userId);

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
      useSSL: false,
      userName: "iwan",
      password: "Iwaniwan123",
      onSuccess: () => {
        console.log("MQTT Connected!");
        mqttClient.subscribe("PwlDq");
      },
      onFailure: (err) => {
        console.error("There's an error");
        console.error(err);
      }
    });

    return (() => {
      if(mqttClient.isConnected()) {
        mqttClient.disconnect();
      }
    });
  }, []);
  
  return <></>;
}