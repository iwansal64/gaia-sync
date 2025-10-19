import { useSensorDataHooks } from "../../../hooks/sensor_hooks/useSensorDataHooks";

export default function TotalDissolvedParticlesValue() {
  const { tds } = useSensorDataHooks();
  
  return <>{tds ?? "-"}</>;
}