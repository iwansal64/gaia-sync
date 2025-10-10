import { useSensorDataHooks } from "../../../hooks/useSensorDataHooks";

export default function ElectricalConductivityValue() {
  const { ec } = useSensorDataHooks();

  return <>{ec ?? "-"}</>;
}