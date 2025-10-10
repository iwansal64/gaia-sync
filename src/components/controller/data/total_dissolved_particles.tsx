import { useSensorDataHooks } from "../../../hooks/useSensorDataHooks";

export default function TotalDissolvedParticlesValue() {
  const { tds } = useSensorDataHooks();
  
  return <>{tds ?? "-"}</>;
}