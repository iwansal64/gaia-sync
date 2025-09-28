import { useDataHooks } from "../../hooks/useDataHooks";

export default function ElectricalConductivityValue() {
  const { ec } = useDataHooks();

  return <>{ec ?? "-"}</>;
}