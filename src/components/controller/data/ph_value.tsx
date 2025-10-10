import { useSensorDataHooks } from "../../../hooks/useSensorDataHooks";

export default function PHValue() {
  const { ph } = useSensorDataHooks();
  
  return <>{ph ?? "-"}</>;
}