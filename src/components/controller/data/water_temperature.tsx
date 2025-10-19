import { useSensorDataHooks } from "../../../hooks/sensor_hooks/useSensorDataHooks";

export default function WaterTemperatureValue() {
  const { tempC } = useSensorDataHooks();

  return <>{tempC ?? "-"}</>;
}