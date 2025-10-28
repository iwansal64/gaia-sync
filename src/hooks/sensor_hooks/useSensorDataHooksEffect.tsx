import { useEffect } from "react";
import { useSensorDataHooks } from "./useSensorDataHooks";

export default function UseSensorDataHooksEffect() {
  const { ec, tds, setWaterQuality } = useSensorDataHooks();
  
  useEffect(() => {
    if(!ec || !tds) return;

    if(tds < 1000) {
      setWaterQuality("Good");
    }
    else {
      setWaterQuality("Poor");
    }
  }, [ec, tds]);
  
  return <></>;
}
