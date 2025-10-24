import type mqtt from "mqtt";

export enum FeedFishReturnType {
      OK,
      Error,
      NotConnected
};

export class MQTT {
      static async feedFish(deviceId: string, mqttClient: mqtt.MqttClient): Promise<FeedFishReturnType> {
            if(!mqttClient.connected) {
                  console.error("[MQTT] MQTT client is not connected!");
                  return FeedFishReturnType.NotConnected;
            }
      
            try {
                  mqttClient.publish(`${deviceId}/feed`, "1");
                  return FeedFishReturnType.OK;
            }
            catch(err) {
                  console.error("[MQTT] There's an error when feeding fish");
                  console.error(err);
                  return FeedFishReturnType.Error;
            }
      }
}