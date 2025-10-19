import { useSensorDataHooks } from "../../../hooks/sensor_hooks/useSensorDataHooks";

export default function PHValue() {
  const { ph } = useSensorDataHooks();
  
  return <>{ph ?? "-"}</>;
}