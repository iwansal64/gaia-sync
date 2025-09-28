import { useDataHooks } from "../../hooks/useDataHooks";

export default function WaterQualityValue() {
  const { waterQuality } = useDataHooks();
  
  return <h1 className="text-4xl font-bold text-black">{waterQuality ?? "-"}</h1>;
}