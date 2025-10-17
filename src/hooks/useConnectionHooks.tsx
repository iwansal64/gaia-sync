import { create } from "zustand";
import mqtt, { type ISubscriptionGrant } from "mqtt";
import { useEffect } from "react";
import { useSensorDataHooks } from "./useSensorDataHooks";
import { useUserDataHooks } from "./useUserDataHooks";
import type { ISubackPacket } from "mqtt-packet";
import { useToastHooks } from "./useToastHooks";

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


// Callback Function
type toastShowMessageFunction = (data: {
    title: string;
    message?: string;
    timeout?: number;
}) => void;

function onSubscribeCallback(showMessage: toastShowMessageFunction, err: Error | null, granted?: ISubscriptionGrant[], packet?: ISubackPacket) {
  if (packet && packet.granted[0] === 128) {
    showMessage({
      title: "Can't connect to the device",
      message: "Have you configure your device yet?",
      timeout: 10000
    });
    return;
  }
  
  if(err) {
    showMessage({
      title: "Error :(",
      message: "There's an error when connecting to the device. Please contact developer 🙏🏻",
      timeout: 10000
    });
    console.error(`This is the error message dawg: ${err.message}`);
  }
  else {
    showMessage({
      title: "Connected!",
      message: "You're connected to the system!",
      timeout: 5000
    });
  }
}


export default function UseConnectionHooksEffect() {
  const { setIsConnected } = useConnectionHooks();
  const { accessToken, userId, deviceId } = useUserDataHooks();
  const { setData } = useSensorDataHooks();
  const { showMessage } = useToastHooks();

  useEffect(() => {
    console.log("Checking Data..")
    if(!userId || !accessToken || !deviceId) return;
    console.log("Connecting..")

    
    const mqttClient = mqtt.connect("wss://mqttws.gaia-odc.digital:443", {
      username: userId,
      password: accessToken,
      reconnectPeriod: 5000,
      resubscribe: true
    });

    mqttClient.on("connect", () => {
      console.log("[MQTT] Connected Successfully!");

      mqttClient.subscribe(`${deviceId}/tds`, {}, (err, granted, packet) => onSubscribeCallback(showMessage, err, granted, packet))
      mqttClient.subscribe(`${deviceId}/ec`, {}, (err, granted, packet) => onSubscribeCallback(showMessage, err, granted, packet))
      mqttClient.subscribe(`${deviceId}/ph`, {}, (err, granted, packet) => onSubscribeCallback(showMessage, err, granted, packet))
      mqttClient.subscribe(`${deviceId}/tempC`, {}, (err, granted, packet) => onSubscribeCallback(showMessage, err, granted, packet))
    })

    mqttClient.on("disconnect", (data) => {
      console.log("[MQTT] Connection lost. Reason Code: ", data.reasonCode);
      setIsConnected(false);
    });

    mqttClient.on("error", (err) => {
      console.error("[MQTT] There's an error");
      console.error(err.message);
    })

    mqttClient.on("message", (topic, buf) => {
      const message = buf.toString();
      const data = Number.parseFloat(message);
      if(isNaN(data)) return;

      switch (topic) {
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
    });

    return (() => {
      if(mqttClient.connected) {
        mqttClient.end(false, {}, () => {
          console.log("[MQTT] Disconnected Gracefully")
        });
      }
    });
  }, []);
  
  return <></>;
}