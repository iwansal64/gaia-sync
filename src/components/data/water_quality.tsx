import { useSensorDataHooks } from "../../hooks/useSensorDataHooks";

export default function WaterQualityValue() {
  const { waterQuality } = useSensorDataHooks();
  
  return <h1 className="text-4xl font-bold text-black">{waterQuality ?? "-"}</h1>;
}