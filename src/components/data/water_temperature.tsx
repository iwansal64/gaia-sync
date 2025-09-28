import { useDataHooks } from "../../hooks/useDataHooks";

export default function WaterTemperatureValue() {
  const { tempC } = useDataHooks();

  return <>{tempC ?? "-"}</>;
}