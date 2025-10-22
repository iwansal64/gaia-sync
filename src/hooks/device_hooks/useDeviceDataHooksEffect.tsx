import { useEffect } from "react";
import { API } from "../../utils/api_interface";
import { useDeviceDataHooks } from "./useDeviceDataHooks";


let initialized = false;

export default function UseDeviceDataHooksEffect() {
  const { setDevicesData } = useDeviceDataHooks();

  const initialize = async () => {
    await useDeviceDataHooks.persist.rehydrate();
    if(useDeviceDataHooks.getState().devicesData !== undefined) return;
    

    API.get_devices().then((data) => {
      // If the data empty or there's an error
      if(!data) return;
      
      // Update devices data
      setDevicesData(data);
    });
    
    initialized = true;
  }
  

  useEffect(() => {
    if(!initialized) initialize();
  }, []);
  
  return <></>;
}
  