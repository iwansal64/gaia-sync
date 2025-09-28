import { useDataHooks } from "../../hooks/useDataHooks";

export default function WaterSubTemperatureValue() {
  const { tempC } = useDataHooks();

  return <>
    <p>{Math.round(((tempC ?? 0) * 9 / 5 + 32) * 100) / 100}°F</p>
    <p>{Math.round(((tempC ?? 0) + 273.15) * 100) / 100}°K</p>
  </>;
}