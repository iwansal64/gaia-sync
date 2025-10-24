import { PiFish } from "react-icons/pi";
import { FeedFishReturnType, MQTT } from "../../utils/mqtt_interface";
import { useDeviceDataHooks } from "../../hooks/device_hooks/useDeviceDataHooks";
import { useConnectionHooks } from "../../hooks/sensor_hooks/useConnectionHooks";
import { useToastHooks } from "../../hooks/global_hooks/useToastHooks";

export default function FeedFishButton() {
      const { deviceId } = useDeviceDataHooks();
      const { mqttClient } = useConnectionHooks();
      const { showMessage } = useToastHooks();
      
      const handleFishFeed = async () => {
            if(!deviceId || !mqttClient) return;
            const result = await MQTT.feedFish(deviceId, mqttClient);
            switch(result) {
                  case FeedFishReturnType.OK:
                        showMessage({ title: "Fish feeded successfully!", timeout: 1000 })
                        break;
                  case FeedFishReturnType.Error:
                        showMessage({ title: "Error!", message: "Oh, there's an unknown error!", timeout: 3000 })
                        break;
                  case FeedFishReturnType.NotConnected:
                        showMessage({ title: "Can't connect!", message: "You're disconnected to the device! Can't feed the fish!", timeout: 3000 })
                        break;
            }
      }
      
      return (
            <>
                  <div className="w-full h-64 bg-[#eee] cursor-pointer duration-250 shadow-lg hover:shadow-2xl hover:translate-x-0.5 active:-translate-x-0.5 hover:translate-y-0.5 active:-translate-y-0.5 flex flex-row gap-4 rounded-2xl" onClick={handleFishFeed}>
                        <div className="w-full h-full flex flex-col justify-center items-center p-4">
                              <h1 className="text-2xl font-bold text-black">Fish Feed</h1>
                              <h1 className="text-base font-thin text-black">click to feed.</h1>
                        </div>
                        <div className="w-full h-full p-4 flex justify-center items-center">
                              <PiFish className="text-6xl" />
                        </div>
                  </div>
            </>
      );
}
