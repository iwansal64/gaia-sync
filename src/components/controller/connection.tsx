import UseConnectionHooksEffect from "../../hooks/sensor_hooks/useConnectionHooks";
import UseSensorDataHooksEffect from "../../hooks/sensor_hooks/useSensorDataHooks";

export default function Connection() {
  return <>
    <UseConnectionHooksEffect />
    <UseSensorDataHooksEffect />
  </>;
}