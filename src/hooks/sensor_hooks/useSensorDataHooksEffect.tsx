import { useEffect } from "react";
import { useSensorDataHooks } from "./useSensorDataHooks";

export default function UseSensorDataHooksEffect() {
  const { ec, tds, setWaterQuality } = useSensorDataHooks();
  
  useEffect(() => {
    if(!ec || !tds) return;

    if(ec < 3 && tds < 500) {
      setWaterQuality("Good");
    }
    else {
      setWaterQuality("Poor");
    }
  }, [ec, tds]);
  
  return <></>;
}
