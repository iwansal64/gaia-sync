import { useSensorDataHooks } from "../../../hooks/useSensorDataHooks";

export default function WaterTemperatureValue() {
  const { tempC } = useSensorDataHooks();

  return <>{tempC ?? "-"}</>;
}