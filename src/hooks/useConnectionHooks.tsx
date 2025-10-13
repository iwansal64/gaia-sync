import { create } from "zustand";
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
  const { accessToken, userId, deviceId } = useUserDataHooks();
  const { setData } = useSensorDataHooks();

  useEffect(() => {
    console.log("Checking Data..")
    if(!userId || !accessToken || !deviceId) return;
    console.log("Connecting..")

    
    const mqttClient = new MQTTClient("mqttws.gaia-odc.digital", 443, "/", userId);

    mqttClient.onConnectionLost = (responseObject) => {
      console.log("Connection lost:", responseObject.errorMessage);
      setIsConnected(false);
    };

    mqttClient.onMessageArrived = (message: Message) => {
      const data = Number.parseFloat(message.payloadString);
      if(isNaN(data)) return;

      switch (message.destinationName) {
        case `${deviceId}/tds`:
          setData({
            tds: data
          });
          break;

        case `${deviceId}/ec`:
          setData({
            ec: data
          });
          break;

        case `${deviceId}/ph`:
          setData({
            ph: data 
          })
          break;

        case `${deviceId}/tempC`:
          setData({
            tempC: data
          })
          break;
      
        default:
          break;
      }
    };


    console.log("ws");
    mqttClient.connect({
      useSSL: true,
      userName: userId,
      password: accessToken,
      onSuccess: () => {
        console.log("MQTT Connected!");
        mqttClient.subscribe(`${deviceId}/tds`);
        mqttClient.subscribe(`${deviceId}/ec`);
        mqttClient.subscribe(`${deviceId}/tempC`);
        mqttClient.subscribe(`${deviceId}/ph`);
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