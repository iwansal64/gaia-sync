import { useSensorDataHooks } from "../../../hooks/useSensorDataHooks";

export default function WaterSubTemperatureValue() {
  const { tempC } = useSensorDataHooks();

  return <>
    <p>{Math.round(((tempC ?? 0) * 9 / 5 + 32) * 100) / 100}°F</p>
    <p>{Math.round(((tempC ?? 0) + 273.15) * 100) / 100}°K</p>
  </>;
}