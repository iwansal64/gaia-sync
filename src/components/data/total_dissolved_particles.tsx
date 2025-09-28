import { useDataHooks } from "../../hooks/useDataHooks";

export default function TotalDissolvedParticlesValue() {
  const { tds } = useDataHooks();
  
  return <>{tds ?? "-"}</>;
}