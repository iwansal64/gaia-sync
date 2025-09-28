import { useDataHooks } from "../../hooks/useDataHooks";

export default function PHValue() {
  const { ph } = useDataHooks();
  
  return <>{ph ?? "-"}</>;
}