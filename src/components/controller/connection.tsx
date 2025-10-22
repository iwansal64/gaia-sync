import UseConnectionHooksEffect from "../../hooks/sensor_hooks/useConnectionHooksEffect";
import UseSensorDataHooksEffect from "../../hooks/sensor_hooks/useSensorDataHooksEffect";

export default function Connection() {
  return <>
    <UseConnectionHooksEffect />
    <UseSensorDataHooksEffect />
  </>;
}