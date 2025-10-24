import { create } from "zustand";
import mqtt from "mqtt";

export type UseConnectionHooksType = {
  isConnected: boolean,
  setIsConnected: (newState: boolean) => void,

  mqttClient: mqtt.MqttClient | null
  setMqttClient: (newMqttClient: mqtt.MqttClient) => void
};

export const useConnectionHooks = create<UseConnectionHooksType>()((set) => ({
  isConnected: false,
  setIsConnected(newState) {
    set(() => ({
      isConnected: newState
    }));
  },

  mqttClient: null,
  setMqttClient(newMqttClient) {
      set(() => ({
        mqttClient: newMqttClient
      }))
  },
}));
