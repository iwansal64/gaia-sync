import { useSensorDataHooks } from "../../../hooks/sensor_hooks/useSensorDataHooks";

export default function ElectricalConductivityValue() {
  const { ec } = useSensorDataHooks();

  return <>{ec ?? "-"}</>;
}